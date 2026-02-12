import Link from 'next/link';
import styles from './chapterSidebar.module.css';

const chapters = [
  { num: 'P', title: 'Introduction', subtitle: 'On Building Software That Holds', href: '/working-fundamentals-introduction' },
  { num: '1', title: 'Programming Fundamentals', subtitle: 'The invariant shape of software', href: '/working-fundamentals-1-of-13-programming-fundamentals' },
  { num: '2', title: 'Data Structures', subtitle: 'How data shapes possibility', href: '/working-fundamentals-2-of-13-data-structures' },
  { num: '3', title: 'Algorithms & Complexity', subtitle: 'Tradeoffs, not tricks', href: '/working-fundamentals-3-of-13-algorithms-and-complexity' },
  { num: '4', title: 'Control & Flow', subtitle: 'Making execution visible', href: '/working-fundamentals-4-of-13-control-and-flow' },
  { num: '5', title: 'State & Change', subtitle: 'What mutates, what must not', href: '/working-fundamentals-5-of-13-state-and-change' },
  { num: '6', title: 'Design Principles', subtitle: 'Boundaries, honesty, intent', href: '/working-fundamentals-6-of-13-design-principles' },
  { num: '7', title: 'Architecture', subtitle: 'Systems that survive growth', href: '/working-fundamentals-7-of-13-architecture' },
  { num: '8', title: 'Persistence & Data Modeling', subtitle: 'Time, identity, durability', href: '/working-fundamentals-8-of-13-persistence-and-data-modeling' },
  { num: '9', title: 'Interfaces & APIs', subtitle: 'Contracts between humans and systems', href: '/working-fundamentals-9-of-13-interfaces-and-apis' },
  { num: '10', title: 'Errors & Failure', subtitle: 'Designing for broken assumptions', href: '/working-fundamentals-10-of-13-errors-and-failure' },
  { num: '11', title: 'Testing', subtitle: 'Confidence, not coverage', href: '/working-fundamentals-11-of-13-testing' },
  { num: '12', title: 'Performance & Scale', subtitle: 'When systems meet reality', href: '/working-fundamentals-12-of-13-performance-and-scale' },
  { num: '13', title: 'The Developer\'s Role', subtitle: 'Responsibility beyond code', href: '/working-fundamentals-13-of-13-the-developers-role' },
  { num: 'PS', title: 'Outroduction', subtitle: 'What Comes After Fundamentals', href: '/working-fundamentals-outroduction' },
];

export function ChapterSidebar() {
  return (
    <aside className={styles.sidebarNav}>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionTitle}>START HERE</div>
        <div className={styles.sidebarItem}>
          <Link href="/working-fundamentals-introduction" className={styles.sidebarItemLink}>
            <div className={styles.sidebarItemIcon}>P</div>
            <div className={styles.sidebarItemContent}>
              <div className={styles.sidebarItemTitle}>Introduction</div>
              <div className={styles.sidebarItemSubtitle}>On Building Software That Holds</div>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionTitle}>CORE CHAPTERS</div>
        {chapters.slice(1, -1).map((chapter) => (
          <div key={chapter.num} className={styles.sidebarItem}>
            <Link href={chapter.href} className={styles.sidebarItemLink}>
              <div className={styles.sidebarItemIcon}>{chapter.num}</div>
              <div className={styles.sidebarItemContent}>
                <div className={styles.sidebarItemTitle}>{chapter.title}</div>
                <div className={styles.sidebarItemSubtitle}>{chapter.subtitle}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.sidebarSectionTitle}>CARRY FORWARD</div>
        <div className={styles.sidebarItem}>
          <Link href="/working-fundamentals-outroduction" className={styles.sidebarItemLink}>
            <div className={styles.sidebarItemIcon}>PS</div>
            <div className={styles.sidebarItemContent}>
              <div className={styles.sidebarItemTitle}>Outroduction</div>
              <div className={styles.sidebarItemSubtitle}>What Comes After Fundamentals</div>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
