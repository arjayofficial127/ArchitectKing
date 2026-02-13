import type { Metadata } from 'next';
import { ChapterPage } from '@/components/book/ChapterPage';

export const metadata: Metadata = {
  title: 'Chapter 13: The Developer\'s Role — Working Fundamentals by Arvin Jayson Castro',
  description: 'Judgment, responsibility, longevity — Chapter 13 of Working Fundamentals',
};

export default function Chapter13Page() {
  return (
    <ChapterPage
      chapterNumber="13"
      chapterTitle="The Developer's Role"
      chapterSubtitle="Judgment, responsibility, longevity"
      currentChapterHref="/working-fundamentals-13-of-13-the-developers-role"
      currentChapterLabel="chapter 13 of 13"
      prevChapter={{
        title: 'Performance & Scale',
        href: '/working-fundamentals-12-of-13-performance-and-scale',
      }}
      nextChapter={{
        title: 'Outroduction',
        href: '/working-fundamentals-outroduction',
      }}
    >
      <h3>What this chapter is</h3>

      <p>
        This chapter is not career advice. It is not a pep talk. It is not a manifesto.
      </p>

      <p>
        This chapter defines <strong>what the role actually is</strong>.
      </p>

      <p>
        Not what it looks like. Not what it is marketed as. What it <strong>demands</strong>.
      </p>

      <h2>The core truth</h2>

      <p>
        A developer is not paid to write code.
      </p>

      <p>
        A developer is trusted to shape <strong>behavior</strong> that affects:
      </p>

      <ul>
        <li>systems</li>
        <li>teams</li>
        <li>organizations</li>
        <li>people</li>
      </ul>

      <p>
        Code is just the medium.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Every line of code is a decision with consequences.
      </p>

      <h2>Skill is temporary. Judgment compounds.</h2>

      <p>
        Languages change. Frameworks expire. Tools rotate.
      </p>

      <p>
        Judgment accumulates.
      </p>

      <p>
        Judgment is:
      </p>

      <ul>
        <li>knowing when <em>not</em> to add</li>
        <li>knowing when to stop</li>
        <li>knowing what to protect</li>
        <li>knowing what must not change</li>
      </ul>

      <p>
        🧠 <strong>Perspective</strong> Senior developers are not faster typists. They are slower decision-makers.
      </p>

      <h2>Responsibility outlives authorship</h2>

      <p>
        You may leave a project. The system remains.
      </p>

      <p>
        Someone else will inherit:
      </p>

      <ul>
        <li>your boundaries</li>
        <li>your shortcuts</li>
        <li>your assumptions</li>
        <li>your clarity—or confusion</li>
      </ul>

      <p>
        That person will pay for what you leave behind.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> You are always coding for someone you will never meet.
      </p>

      <h2>The quiet power of restraint</h2>

      <p>
        Most damage is done by:
      </p>

      <ul>
        <li>unnecessary abstraction</li>
        <li>premature optimization</li>
        <li>unneeded flexibility</li>
        <li>cleverness without justification</li>
      </ul>

      <p>
        Restraint looks like:
      </p>

      <ul>
        <li>fewer features</li>
        <li>smaller interfaces</li>
        <li>boring solutions</li>
        <li>explicit tradeoffs</li>
      </ul>

      <p>
        🧠 <strong>Architect&apos;s Note</strong> What you choose <em>not</em> to build matters more over time.
      </p>

      <h2>Ownership is not authority</h2>

      <p>
        Ownership is not control.
      </p>

      <p>
        Ownership means:
      </p>

      <ul>
        <li>you understand the consequences</li>
        <li>you accept accountability</li>
        <li>you fix what you break</li>
        <li>you defend what matters</li>
      </ul>

      <p>
        Authority fades. Ownership persists.
      </p>

      <h2>You are a steward of complexity</h2>

      <p>
        Complexity cannot be eliminated. It can only be:
      </p>

      <ul>
        <li>shaped</li>
        <li>contained</li>
        <li>deferred</li>
        <li>revealed</li>
      </ul>

      <p>
        Your role is not to erase complexity, but to <strong>prevent it from spreading blindly</strong>.
      </p>

      <p>
        🧠 <strong>Mental Model</strong> Unmanaged complexity becomes suffering.
      </p>

      <h2>Teaching through structure</h2>

      <p>
        The best developers teach without documentation.
      </p>

      <p>
        They teach through:
      </p>

      <ul>
        <li>clear boundaries</li>
        <li>honest interfaces</li>
        <li>predictable behavior</li>
        <li>readable decisions</li>
      </ul>

      <p>
        The system explains itself.
      </p>

      <p>
        🧠 <strong>Perspective</strong> If a system requires constant explanation, it is unfinished.
      </p>

      <h2>Ethics in engineering (quiet, but real)</h2>

      <p>
        Engineering choices affect:
      </p>

      <ul>
        <li>privacy</li>
        <li>safety</li>
        <li>reliability</li>
        <li>livelihoods</li>
      </ul>

      <p>
        Most ethical failures are not malicious. They are <strong>careless</strong>.
      </p>

      <p>
        Ethics is attention applied consistently.
      </p>

      <h2>Legacy is unavoidable</h2>

      <p>
        Whether you want it or not, you leave a legacy.
      </p>

      <p>
        It might be:
      </p>

      <ul>
        <li>a system people trust</li>
        <li>a system people fear</li>
        <li>a system people avoid</li>
      </ul>

      <p>
        Legacy is not size. It is <strong>impact over time</strong>.
      </p>

      <h2>Minimal practice (the last one)</h2>

      <p>
        <strong>Question:</strong> &quot;If I leave this system today, what assumptions am I forcing on the next person?&quot;
      </p>

      <p>
        If you cannot answer clearly, the work is incomplete.
      </p>

      <h2>What beginners gain here</h2>

      <ul>
        <li>A sense of responsibility</li>
        <li>A reason to slow down</li>
        <li>A higher standard</li>
      </ul>

      <h2>What experienced developers recognize</h2>

      <ul>
        <li>Why some work feels meaningful</li>
        <li>Why some projects feel heavy</li>
        <li>Why craftsmanship matters</li>
      </ul>

      <p>
        They have lived the consequences.
      </p>

      <h2>What this chapter deliberately avoids</h2>

      <ul>
        <li>Titles</li>
        <li>Career ladders</li>
        <li>Compensation advice</li>
        <li>Personal branding</li>
      </ul>

      <p>
        Those are external.
      </p>

      <h2>Final Closing (the book&apos;s spine)</h2>

      <p>
        Good software is not clever. It is not impressive. It is not fast.
      </p>

      <p>
        It <strong>holds</strong>.
      </p>

      <p>
        It holds under:
      </p>

      <ul>
        <li>change</li>
        <li>pressure</li>
        <li>time</li>
        <li>unfamiliar hands</li>
      </ul>

      <p>
        That is the standard.
      </p>

      <p>
        If you build toward that, your work will outlast you — and that is enough.
      </p>
    </ChapterPage>
  );
}
