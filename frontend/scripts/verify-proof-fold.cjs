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
  'where-help-heading': [
    'Where I can help',
    'When software gets harder than it should be',
    'The signs are usually familiar. Changes take longer, ownership gets blurry, and the same problems keep coming back.',
    'Every feature touches unrelated parts', 'Permissions are difficult to trust',
    'The same rule lives in five places', 'Delivery slows as the product grows',
    'Nobody is sure who owns the data', 'The same incidents keep returning',
    'Platform boundaries', 'Keep product growth from becoming system sprawl.',
    'Identity and access', 'Make permissions explicit, testable, and safer to change.',
    'Complex workflows', 'Turn business rules into behavior the team can reason about.',
    'Integration and delivery', 'Connect the moving parts and stay through production.',
  ],
  'how-work-heading': [
    'How I work', 'Understand it. Decide together. Help make it happen.',
    'Understand before changing things',
    'I learn the product, code, data, constraints, and pressure around the work before suggesting an answer.',
    'Make the tradeoffs clear',
    'I explain the options in plain language so we can choose a sensible path together.',
    'Stay and help ship it',
    'I work alongside the team through implementation, integration, testing, release, and whatever turns up along the way.',
  ],
  'ways-help-heading': [
    'Ways I can help', "Start with the problem. We'll keep the scope sensible.",
    'A second look', 'Good first step', 'Architecture Review',
    'When you need another set of eyes, a clearer view of the risks, and a decision you can act on.',
    'From $350', 'Look at the system', 'Short-term help', 'System Stabilization',
    'When delivery has slowed, failures repeat, or changes have become harder than they should be.',
    'Scoped around what is needed', 'Discuss the pressure', 'Ongoing help', 'Work Alongside Your Team',
    'When the team needs experienced help with decisions and someone willing to work through the details with them.',
    'Directly with you and the team', 'See if there is a fit',
  ],
  'fundamentals-heading': [
    'Working Fundamentals · 13-part guide', 'I write down what has helped me.',
    'Notes on boundaries, state, data, failure, testing, performance, and other lessons I keep returning to when building software.',
    'Start reading', 'Explore all chapters',
  ],
};

for (const [id, copy] of Object.entries(approved)) {
  test(`${id}: all approved copy is present without JavaScript`, () => {
    const text = decode(section(id));
    for (const line of copy) assert.ok(text.includes(line), `Missing or changed copy: ${line}`);
  });
}

test('Six native signal buttons have valid descriptions and one initial selection', () => {
  const map = section('where-help-heading');
  const buttons = [...map.matchAll(/<button\b([^>]*)>/g)];
  assert.equal(buttons.length, 6);
  assert.equal(buttons.filter(([, props]) => props.includes('aria-pressed="true"')).length, 1);
  for (const [, props] of buttons) {
    assert.ok(props.includes('type="button"'));
    const description = props.match(/aria-describedby="([^"]+)"/);
    assert.ok(description);
    assert.ok(props.includes(`aria-controls="${description[1]}"`));
    assert.ok(map.includes(`id="${description[1]}"`));
  }
});

test('The process remains an ordered, readable three-step list', () => {
  const method = section('how-work-heading');
  assert.ok(method.includes('<ol'));
  assert.equal([...method.matchAll(/<li\b/g)].length, 3);
});

test('The three engagement cards retain their destinations and accessible names', () => {
  const cards = [...section('ways-help-heading').matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.equal(cards.length, 3);
  ['/architecture-review', '/contact-me', '/schedule'].forEach((href, i) => {
    assert.ok(cards[i][1].includes(`href="${href}"`));
    assert.ok(cards[i][1].includes('aria-labelledby='));
    assert.ok(cards[i][2].includes('<h3'));
    assert.ok(!/<button|<a\b/.test(cards[i][2]), 'No nested interactive controls');
  });
});

test('Book artwork and both reading destinations are present', () => {
  const book = section('fundamentals-heading');
  assert.ok(book.includes('href="/working-fundamentals-introduction"'));
  assert.ok(book.includes('href="/working-fundamentals"'));
  assert.ok(book.includes('alt="Working Fundamentals by Arvin Jayson Castro"'));
  assert.ok(book.includes('working-fundamentals-paperback.png'));
  assert.ok(fs.existsSync(path.join(root, 'public/architectking/working-fundamentals-paperback.png')));
});
