// Run after `next build`: node scripts/verify-proof-fold.cjs
// Checks generated output, not just source; no browser or extra dependencies needed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, '.next/server/app/index.html'), 'utf8');
const decode = (text) => text.replace(/<[^>]*>/g, ' ').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const section = (id) => {
  const match = html.match(new RegExp(`<section\\b[^>]*aria-labelledby="${id}"[^>]*>([\\s\\S]*?)</section>`));
  assert.ok(match, `Missing section: ${id}`);
  return match[1];
};

const approved = {
  'journey-heading': [
    'Ways we can work together', 'Choose the kind of help you need',
    'Practical support for complex systems and teams—focused, flexible, and outcome-driven.',
    'Architecture Review', 'System Stabilization', 'Work Alongside Your Team',
    'Best for', "What's included", 'Understand before changing things', 'Make tradeoffs clear', 'Stay and help ship it',
  ],
  'starting-point-heading': [
    'What are you working on?',
    "Tell me what you're building or what's getting difficult. We'll work out where I can help and start from there.",
    'Tell me about it',
  ],
};

for (const [id, copy] of Object.entries(approved)) {
  test(`${id}: all approved copy is present without JavaScript`, () => {
    const text = decode(section(id));
    for (const line of copy) assert.ok(text.includes(line), `Missing or changed copy: ${line}`);
  });
}

test('Engagement cards converge on contact actions', () => {
  const start = section('starting-point-heading');
  assert.equal([...start.matchAll(/href="\/contact-me"/g)].length, 1);
  assert.ok(start.includes('Tell me about it'));
  const cards = section('journey-heading');
  assert.equal([...cards.matchAll(/href="\/contact-me\?help=/g)].length, 3);
});

test('Working Fundamentals is the fourth portfolio item', () => {
  const book = html;
  const bookText = decode(book);
  assert.ok(book.includes('Two live products, one Windows prototype, and the notes behind how I build.'));
  assert.ok(book.includes('Working Fundamentals · Field Notes'));
  assert.ok(bookText.includes('Systems That Hold Under Pressure'));
  assert.ok(bookText.includes('Thirteen short chapters on the decisions that make a system dependable long after launch.'));
  assert.ok(book.includes('href="/working-fundamentals-introduction"'));
  assert.ok(book.includes('href="/working-fundamentals"'));
  assert.ok(book.includes('alt="Working Fundamentals by Arvin Jayson Castro"'));
  assert.ok(book.includes('working-fundamentals-paperback.png'));
  assert.ok(fs.existsSync(path.join(root, 'public/architectking/working-fundamentals-paperback.png')));
});
