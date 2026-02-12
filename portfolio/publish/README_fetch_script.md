# Page Data Fetch Script

Script to extract values from BaseOfUI page edit URLs.

## Installation

```bash
pip install requests beautifulsoup4
```

## Usage

### Basic Usage (HTML scraping - no auth needed)

```bash
python fetch_page_data.py working-fundamentals-1-of-13-programming-fundamentals
```

### With Authentication (uses API endpoint)

```bash
# Set auth token as environment variable
export AUTH_TOKEN="your-auth-token-here"

# Or pass as argument
python fetch_page_data.py working-fundamentals-1-of-13-programming-fundamentals --auth-token "your-token"
```

### With Custom Org ID

```bash
python fetch_page_data.py working-fundamentals-1-of-13-programming-fundamentals \
  --org-id "82c2d096-2638-4837-83c8-e8a933bb17c7"
```

### Output Options

```bash
# Save to custom file
python fetch_page_data.py working-fundamentals-1-of-13-programming-fundamentals \
  --output my_page_data.json

# JSON format only (no pretty print)
python fetch_page_data.py working-fundamentals-1-of-13-programming-fundamentals \
  --format json
```

## What It Extracts

The script extracts:
- Page metadata (id, name, slug, description)
- Visibility settings
- Layout/content JSON
- Styles
- Timestamps
- Form data (from HTML pages)
- Raw data for further processing

## Output

Results are saved to `{page_slug}_data.json` by default, and also printed to console in readable format.

## Examples

```bash
# Fetch Chapter 1 data
python fetch_page_data.py working-fundamentals-1-of-13-programming-fundamentals

# Fetch Introduction
python fetch_page_data.py working-fundamentals-introduction

# Fetch with auth token from env
export AUTH_TOKEN="your-token"
python fetch_page_data.py working-fundamentals-1-of-13-programming-fundamentals
```
