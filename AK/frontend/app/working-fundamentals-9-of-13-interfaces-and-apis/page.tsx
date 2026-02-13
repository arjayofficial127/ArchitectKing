import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 9: Interfaces & APIs — Working Fundamentals by Arvin Jayson Castro',
  description: 'Contracts between humans and systems — Chapter 9 of Working Fundamentals',
};

export default function Chapter9Page() {
  return (
    <ChapterPage
      chapterNumber="9"
      chapterTitle="Interfaces & APIs"
      chapterSubtitle="Contracts between humans and systems"
      currentChapterHref="/working-fundamentals-9-of-13-interfaces-and-apis"
      currentChapterLabel="chapter 9 of 13"
      prevChapter={{
        title: 'Persistence & Data Modeling',
        href: '/working-fundamentals-8-of-13-persistence-and-data-modeling',
      }}
      nextChapter={{
        title: 'Errors & Failure',
        href: '/working-fundamentals-10-of-13-errors-and-failure',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not about REST. It is not about GraphQL. It is not about HTTP verbs, schemas, or tooling.
      </p>

      <p>
        This chapter is about <strong>commitment</strong>.
      </p>

      <p>
        An interface is the moment a system stops being private.
      </p>

      <h2>The core truth</h2>

      <p>
        An interface is a <strong>promise about behavior</strong>.
      </p>

      <p>
        Once exposed, it will be:
      </p>

      <ul>
        <li>depended on</li>
        <li>worked around</li>
        <li>relied upon in unintended ways</li>
      </ul>

      <p>
        You can change implementation freely. You cannot change promises cheaply.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> APIs outlive the intent of their creators.
      </p>

      <h2>Interfaces exist to protect both sides</h2>

      <p>
        A good interface protects:
      </p>

      <ul>
        <li>consumers from internal churn</li>
        <li>providers from consumer misuse</li>
      </ul>

      <p>
        A bad interface:
      </p>

      <ul>
        <li>leaks internals</li>
        <li>invites coupling</li>
        <li>creates dependency traps</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> An interface should make the <em>right thing easy</em> and the <em>wrong thing hard</em>.
      </p>

      <h2>Stability beats expressiveness</h2>

      <p>
        The temptation is to expose everything.
      </p>

      <p>
        Expressive APIs feel powerful early. They feel dangerous later.
      </p>

      <p>
        Stable APIs:
      </p>

      <ul>
        <li>do less</li>
        <li>change rarely</li>
        <li>force discipline</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> An API that rarely changes is more valuable than one that can do everything.
      </p>

      <h2>Shape matters more than technology</h2>

      <p>
        Whether an interface is:
      </p>

      <ul>
        <li>a function</li>
        <li>a module</li>
        <li>a service</li>
        <li>a message</li>
      </ul>

      <p>
        …the same rules apply.
      </p>

      <p>
        Good interfaces:
      </p>

      <ul>
        <li>have clear inputs</li>
        <li>have clear outputs</li>
        <li>have clear failure modes</li>
        <li>hide internal decisions</li>
      </ul>

      <p>
        Technology is incidental. Shape is essential.
      </p>

      <h2>Leaky abstractions hurt twice</h2>

      <p>
        When an interface leaks internal details:
      </p>

      <ul>
        <li>consumers depend on them</li>
        <li>providers become trapped by them</li>
      </ul>

      <p>
        This creates:
      </p>

      <ul>
        <li>fragile integrations</li>
        <li>coordination overhead</li>
        <li>fear of change</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> If consumers know how it works, you&apos;ve already lost freedom.
      </p>

      <h2>Versioning is a cost, not a solution</h2>

      <p>
        Versioning feels like safety.
      </p>

      <p>
        In reality, it:
      </p>

      <ul>
        <li>multiplies surface area</li>
        <li>splits attention</li>
        <li>prolongs bad decisions</li>
      </ul>

      <p>
        Versioning should be:
      </p>

      <ul>
        <li>rare</li>
        <li>deliberate</li>
        <li>accompanied by deprecation</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> The best versioning strategy is needing it as little as possible.
      </p>

      <h2>Error behavior is part of the interface</h2>

      <p>
        An interface is incomplete without:
      </p>

      <ul>
        <li>defined failure modes</li>
        <li>consistent error signaling</li>
        <li>clear recovery expectations</li>
      </ul>

      <p>
        Silence is not stability. Ambiguity is not flexibility.
      </p>

      <p>
        🧠 <strong>Perspective</strong> Consumers will build logic around how you fail.
      </p>

      <h2>Interfaces create political boundaries</h2>

      <p>
        APIs exist between:
      </p>

      <ul>
        <li>teams</li>
        <li>organizations</li>
        <li>vendors</li>
        <li>timeframes</li>
      </ul>

      <p>
        They are social contracts as much as technical ones.
      </p>

      <p>
        Breaking an interface:
      </p>

      <ul>
        <li>costs trust</li>
        <li>costs coordination</li>
        <li>costs velocity</li>
      </ul>

      <p>
        🧠 <strong>Mental Model</strong> Technical breakage becomes organizational friction.
      </p>

      <h2>Narrow interfaces scale better</h2>

      <p>
        Wide interfaces invite misuse. Narrow interfaces constrain behavior.
      </p>

      <p>
        A narrow interface:
      </p>

      <ul>
        <li>limits dependency</li>
        <li>clarifies intent</li>
        <li>reduces coupling</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> You can always add later. Removing is painful.
      </p>

      <h2>Documentation is not decoration</h2>

      <p>
        Documentation explains:
      </p>

      <ul>
        <li>what is promised</li>
        <li>what is not</li>
        <li>what must not be assumed</li>
      </ul>

      <p>
        Undocumented behavior becomes folklore. Folklore becomes dependency.
      </p>

      <h2>Interfaces and time</h2>

      <p>
        Interfaces must survive:
      </p>

      <ul>
        <li>new features</li>
        <li>new teams</li>
        <li>new requirements</li>
        <li>new scale</li>
      </ul>

      <p>
        If an interface requires constant explanation, it is already failing.
      </p>

      <h2>Minimal practice (still no code)</h2>

      <p>
        <strong>Problem:</strong> &quot;You expose a service that creates and updates user data.&quot;
      </p>

      <p>
        Ask:
      </p>

      <ul>
        <li>What must always be true?</li>
        <li>What must never be allowed?</li>
        <li>What errors are expected?</li>
        <li>What assumptions should consumers <em>not</em> make?</li>
      </ul>

      <p>
        If the answers are fuzzy, the interface is unsafe.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>Respect for contracts</li>
        <li>Less accidental coupling</li>
        <li>Cleaner boundaries</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why integrations rot</li>
        <li>Why changes are risky</li>
        <li>Why APIs feel constraining over time</li>
      </ul>

      <p>
        Promises were made too freely.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Protocol debates</li>
        <li>Tool comparisons</li>
        <li>Framework opinions</li>
        <li>Implementation mechanics</li>
      </ul>

      <p>
        Those are downstream.
      </p>

      <h2>Closing</h2>

      <p>
        Interfaces are promises that bind the future.
      </p>

      <p>
        Make them:
      </p>

      <ul>
        <li>small</li>
        <li>boring</li>
        <li>stable</li>
        <li>explicit</li>
      </ul>

      <p>
        A system with good interfaces can evolve calmly. A system with bad ones lives in negotiation.
      </p>
    </ChapterPage>
  );
}
