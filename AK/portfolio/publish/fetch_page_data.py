#!/usr/bin/env python3
"""
Script to fetch and extract values from BaseOfUI page edit URLs
Usage: python fetch_page_data.py <page_slug> [--org-id <org_id>]
"""

import requests
import json
import sys
import re
from urllib.parse import urlparse, parse_qs
from bs4 import BeautifulSoup
import os

# Default organization ID from the URL
DEFAULT_ORG_ID = "82c2d096-2638-4837-83c8-e8a933bb17c7"
BASE_URL = "https://arvinjaysoncastro.com"

def fetch_page_data(page_slug, org_id=None, auth_token=None, use_api=True):
    """
    Fetch page data from BaseOfUI edit page or API
    
    Args:
        page_slug: The page slug (e.g., 'working-fundamentals-1-of-13-programming-fundamentals')
        org_id: Organization ID (defaults to DEFAULT_ORG_ID)
        auth_token: Optional authentication token
        use_api: If True, try API endpoint first (requires auth), else use HTML page
    
    Returns:
        dict: Extracted page data
    """
    if org_id is None:
        org_id = DEFAULT_ORG_ID
    
    # Prepare headers
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/html',
    }
    
    # Add auth token if provided
    if auth_token:
        headers['Authorization'] = f'Bearer {auth_token}'
        # Or if using cookies
        # headers['Cookie'] = f'auth_token={auth_token}'
    
    # Try API endpoint first if auth token is provided
    if use_api and auth_token:
        api_url = f"{BASE_URL}/api/orgs/{org_id}/pages/{page_slug}"
        print(f"Trying API endpoint: {api_url}")
        try:
            response = requests.get(api_url, headers=headers, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, dict) and 'data' in data:
                    return extract_from_json(data['data'])
                return extract_from_json(data)
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}, trying HTML page...")
    
    # Fallback to HTML page
    edit_url = f"{BASE_URL}/orgs/{org_id}/pages/{page_slug}/edit"
    print(f"Fetching data from: {edit_url}")
    
    try:
        # Try to fetch the page
        response = requests.get(edit_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Check if response is JSON
        if response.headers.get('Content-Type', '').startswith('application/json'):
            data = response.json()
            return extract_from_json(data)
        
        # Otherwise parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        return extract_from_html(soup, response.text)
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching page: {e}")
        return None

def extract_from_json(data):
    """Extract values from JSON response"""
    result = {}
    
    # Common patterns in BaseOfUI API responses
    if isinstance(data, dict):
        # Look for page data (API response format: { success: true, data: {...} })
        if 'data' in data and isinstance(data['data'], dict):
            page_data = data['data']
        elif 'page' in data:
            page_data = data['page']
        else:
            page_data = data
        
        # Extract common page properties
        result['id'] = page_data.get('id', '')
        result['name'] = page_data.get('name', '')
        result['title'] = page_data.get('title') or page_data.get('name', '')
        result['slug'] = page_data.get('slug', '')
        result['description'] = page_data.get('description', '')
        result['visibility'] = page_data.get('visibility', '')
        result['publicSlug'] = page_data.get('publicSlug', '')
        result['isListed'] = page_data.get('isListed', False)
        result['isOrgLandingPage'] = page_data.get('isOrgLandingPage', False)
        result['kind'] = page_data.get('kind', '')
        result['folder'] = page_data.get('folder', '')
        
        # Layout/content data
        if 'layout' in page_data:
            result['layout'] = page_data.get('layout')
        if 'contentJson' in page_data:
            result['contentJson'] = page_data.get('contentJson')
        if 'content' in page_data:
            result['content'] = page_data.get('content')
        
        # Metadata and styles
        if 'metadata' in page_data:
            result['metadata'] = page_data.get('metadata', {})
        if 'styles' in page_data:
            result['styles'] = page_data.get('styles', {})
        
        # Timestamps
        result['createdAt'] = page_data.get('createdAt', '')
        result['updatedAt'] = page_data.get('updatedAt', '')
        
        # Store full data
        result['raw_data'] = data
    
    return result

def extract_from_html(soup, html_text):
    """Extract values from HTML page"""
    result = {}
    
    # Try to find JSON data in script tags
    script_tags = soup.find_all('script', type='application/json')
    for script in script_tags:
        try:
            data = json.loads(script.string)
            json_data = extract_from_json(data)
            result.update(json_data)
        except:
            pass
    
    # Look for window.__INITIAL_STATE__ or similar
    state_patterns = [
        r'window\.__INITIAL_STATE__\s*=\s*({.+?});',
        r'window\.__PAGE_DATA__\s*=\s*({.+?});',
        r'const\s+pageData\s*=\s*({.+?});',
    ]
    
    for pattern in state_patterns:
        matches = re.search(pattern, html_text, re.DOTALL)
        if matches:
            try:
                data = json.loads(matches.group(1))
                json_data = extract_from_json(data)
                result.update(json_data)
            except:
                pass
    
    # Extract from meta tags
    meta_tags = soup.find_all('meta')
    for meta in meta_tags:
        name = meta.get('name') or meta.get('property', '')
        content = meta.get('content', '')
        if name:
            result[f'meta_{name}'] = content
    
    # Extract title
    title_tag = soup.find('title')
    if title_tag:
        result['html_title'] = title_tag.string
    
    # Extract form inputs (common in edit pages)
    inputs = soup.find_all(['input', 'textarea', 'select'])
    form_data = {}
    for inp in inputs:
        name = inp.get('name') or inp.get('id', '')
        value = inp.get('value') or inp.string or ''
        if name:
            form_data[name] = value
    
    if form_data:
        result['form_data'] = form_data
    
    # Store raw HTML for further analysis
    result['raw_html'] = html_text[:1000]  # First 1000 chars
    
    return result

def save_results(data, output_file=None):
    """Save extracted data to file"""
    if output_file is None:
        output_file = 'page_data.json'
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Data saved to: {output_file}")

def print_results(data):
    """Print extracted data in readable format"""
    print("\n" + "="*60)
    print("EXTRACTED PAGE DATA")
    print("="*60)
    
    for key, value in data.items():
        if key == 'raw_data' or key == 'raw_html':
            print(f"\n{key}:")
            print(f"  (Large data - see output file for full content)")
        elif isinstance(value, dict):
            print(f"\n{key}:")
            for k, v in value.items():
                if isinstance(v, str) and len(v) > 100:
                    print(f"  {k}: {v[:100]}...")
                else:
                    print(f"  {k}: {v}")
        elif isinstance(value, str) and len(value) > 100:
            print(f"{key}: {value[:100]}...")
        else:
            print(f"{key}: {value}")
    
    print("="*60)

def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Fetch and extract values from BaseOfUI page edit URLs'
    )
    parser.add_argument(
        'page_slug',
        help='Page slug (e.g., working-fundamentals-1-of-13-programming-fundamentals)'
    )
    parser.add_argument(
        '--org-id',
        default=DEFAULT_ORG_ID,
        help=f'Organization ID (default: {DEFAULT_ORG_ID})'
    )
    parser.add_argument(
        '--auth-token',
        help='Authentication token (if required). Can also set AUTH_TOKEN env var.'
    )
    parser.add_argument(
        '--no-api',
        action='store_true',
        help='Skip API endpoint, only use HTML page scraping'
    )
    parser.add_argument(
        '--output',
        '-o',
        help='Output file (default: page_data.json)'
    )
    parser.add_argument(
        '--format',
        choices=['json', 'pretty'],
        default='pretty',
        help='Output format'
    )
    
    args = parser.parse_args()
    
    # Get auth token from arg or env var
    auth_token = args.auth_token or os.getenv('AUTH_TOKEN')
    
    # Fetch data
    data = fetch_page_data(
        args.page_slug,
        org_id=args.org_id,
        auth_token=auth_token,
        use_api=not args.no_api
    )
    
    if data is None:
        print("Failed to fetch page data")
        sys.exit(1)
    
    # Print results
    if args.format == 'pretty':
        print_results(data)
    
    # Save to file
    output_file = args.output or f"{args.page_slug}_data.json"
    save_results(data, output_file)
    
    return data

if __name__ == '__main__':
    # Check if BeautifulSoup4 is installed
    try:
        import bs4
    except ImportError:
        print("Error: beautifulsoup4 is required. Install with: pip install beautifulsoup4")
        sys.exit(1)
    
    # Check if requests is installed
    try:
        import requests
    except ImportError:
        print("Error: requests is required. Install with: pip install requests")
        sys.exit(1)
    
    main()
