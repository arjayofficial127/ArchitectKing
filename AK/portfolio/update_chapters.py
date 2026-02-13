import re
import os

def extract_metadata(md_content):
    """Extract chapter number, title, and subtitle"""
    lines = [l.rstrip() for l in md_content.split('\n')]
    chapter_num = None
    title = None
    subtitle = None
    
    # Find title first
    for i, line in enumerate(lines):
        if line.strip().startswith('Chapter '):
            match = re.match(r'Chapter (\d+)', line.strip())
            if match:
                chapter_num = int(match.group(1))
        
        # Title: line that comes after === (skip empty lines)
        if i > 0:
            prev_line = lines[i-1].strip()
            if prev_line and all(c == '=' for c in prev_line):
                # Skip empty lines after ===
                j = i
                while j < len(lines) and not lines[j].strip():
                    j += 1
                if j < len(lines) and lines[j].strip() and not lines[j].strip().startswith('Chapter '):
                    title = lines[j].strip()
                    break
    
    # Find subtitle (first ### that's not special, after title)
    for i, line in enumerate(lines):
        if line.strip().startswith('### '):
            text = line.strip()[4:].strip()
            if text not in ['What this chapter is', 'Next Chapter']:
                subtitle = text
                break
    
    return chapter_num, title, subtitle

def markdown_to_html_body(md_content):
    """Convert markdown body to HTML"""
    html = []
    lines = [l.rstrip() for l in md_content.split('\n')]
    i = 0
    in_content = False
    
    while i < len(lines):
        line = lines[i].strip()
        
        # Start processing after "What this chapter is"
        if not in_content:
            if line.startswith('### What this chapter is') or (line.startswith('What this chapter is') and i+1 < len(lines) and lines[i+1].strip() and all(c == '-' for c in lines[i+1].strip())):
                in_content = True
                html.append('<h3>What this chapter is</h3>')
            i += 1
            continue
        
        # Stop at "Next Chapter"
        if line.startswith('### Next Chapter'):
            break
            
        # Skip chapter header, title, subtitle lines
        if line.startswith('Chapter ') or (line and all(c == '=' for c in line)) or (line and all(c == '-' for c in line)):
            i += 1
            continue
            
        # H3 (###)
        if line.startswith('### '):
            text = line[4:].strip()
            if text not in ['What this chapter is', 'Next Chapter']:
                html.append(f'<h3>{text}</h3>')
            i += 1
            continue
            
        # H2 (underlined with ---)
        if i + 1 < len(lines):
            next_line = lines[i+1].strip()
            if next_line and all(c == '-' for c in next_line) and len(next_line) > 3:
                text = line
                html.append(f'<h2>{text}</h2>')
                i += 2
                continue
            
        # Empty line
        if not line:
            i += 1
            continue
            
        # List item
        if line.startswith('*   ') or (line.startswith('- ') and len(line) > 2 and not line.startswith('---')):
            items = []
            while i < len(lines) and (lines[i].strip().startswith('*   ') or (lines[i].strip().startswith('- ') and len(lines[i].strip()) > 2 and not lines[i].strip().startswith('---'))):
                item_text = lines[i].strip()
                if item_text.startswith('- '):
                    item_text = item_text[2:].strip()
                else:
                    item_text = item_text[4:].strip()
                item_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', item_text)
                item_text = re.sub(r'_(.*?)_', r'<em>\1</em>', item_text)
                items.append(f'<li>{item_text}</li>')
                i += 1
            if items:
                html.append('<ul>')
                html.extend(items)
                html.append('</ul>')
            continue
            
        # Numbered list
        if re.match(r'^\d+\.\s+', line):
            items = []
            while i < len(lines) and re.match(r'^\d+\.\s+', lines[i].strip()):
                item_text = re.sub(r'^\d+\.\s+', '', lines[i].strip())
                item_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', item_text)
                item_text = re.sub(r'_(.*?)_', r'<em>\1</em>', item_text)
                items.append(f'<li>{item_text}</li>')
                i += 1
            if items:
                html.append('<ol>')
                html.extend(items)
                html.append('</ol>')
            continue
            
        # Blockquote
        if line.startswith('> '):
            quote_lines = []
            while i < len(lines) and lines[i].strip().startswith('> '):
                quote_lines.append(lines[i].strip()[2:].strip())
                i += 1
            if quote_lines:
                quote_text = ' '.join(quote_lines)
                quote_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', quote_text)
                html.append(f'<blockquote>{quote_text}</blockquote>')
            continue
            
        # Regular paragraph
        para_lines = []
        orig_i = i
        while i < len(lines) and lines[i].strip() and not lines[i].strip().startswith('#') and not (lines[i].strip().startswith('*   ') or (lines[i].strip().startswith('- ') and len(lines[i].strip()) > 2 and not lines[i].strip().startswith('---'))) and not re.match(r'^\d+\.\s+', lines[i].strip()) and not lines[i].strip().startswith('>'):
            para_lines.append(lines[i].strip())
            i += 1
            if i < len(lines) and not lines[i].strip():
                break
        
        if para_lines:
            para_text = ' '.join(para_lines)
            para_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', para_text)
            para_text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', para_text)
            para_text = re.sub(r'_(.*?)_', r'<em>\1</em>', para_text)
            html.append(f'<p>{para_text}</p>')
        else:
            i = orig_i + 1
    
    return '\n\n            '.join(html)

# Process all chapters
for chapter_num in range(3, 14):
    md_file = f'system-fundamentals/{chapter_num:02d}.md'
    html_file = f'publish/ch_{chapter_num:02d}.html'
    
    if not os.path.exists(md_file):
        print(f"Skipping {md_file} - not found")
        continue
    
    print(f"Processing Chapter {chapter_num}...")
    
    # Read markdown
    with open(md_file, 'r') as f:
        md_content = f.read()
    
    # Extract metadata
    num, title, subtitle = extract_metadata(md_content)
    
    if not title:
        print(f"  Warning: Could not extract title for chapter {chapter_num}")
        continue
    
    # Convert body
    html_body = markdown_to_html_body(md_content)
    
    # Read HTML template
    with open(html_file, 'r') as f:
        html_content = f.read()
    
    # Update chapter number
    html_content = re.sub(
        r'<span>chapter \d+ of 13</span>',
        f'<span>chapter {chapter_num} of 13</span>',
        html_content
    )
    
    # Update title and subtitle
    html_content = re.sub(
        r'<h1 class="chapter-title">.*?</h1>',
        f'<h1 class="chapter-title">{title}</h1>',
        html_content,
        flags=re.DOTALL
    )
    
    if subtitle:
        html_content = re.sub(
            r'<p class="chapter-subtitle">.*?</p>',
            f'<p class="chapter-subtitle">{subtitle}</p>',
            html_content,
            flags=re.DOTALL
        )
    
    # Update chapter body
    html_content = re.sub(
        r'<div class="chapter-body">.*?</div>',
        f'<div class="chapter-body">
            {html_body}
          </div>',
        html_content,
        flags=re.DOTALL
    )
    
    # Update sidebar current chapter
    html_content = re.sub(
        f'Chapter {chapter_num} · [^<]*sidebar__chapter-link--current',
        f'Chapter {chapter_num} · {title}',
        html_content
    )
    html_content = re.sub(
        r'Chapter \d+ · [^<]*sidebar__chapter-link--current',
        f'Chapter {chapter_num} · {title}',
        html_content
    )
    
    # Update JavaScript currentChapterIndex
    html_content = re.sub(
        r'const currentChapterIndex = \d+;',
        f'const currentChapterIndex = {chapter_num};',
        html_content
    )
    
    # Write updated HTML
    with open(html_file, 'w') as f:
        f.write(html_content)
    
    print(f"  ✓ Updated {html_file}")

print("\nAll chapters updated!")
