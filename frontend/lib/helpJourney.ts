export const pressureSignals = [
  ['boundaries', 'Every feature touches unrelated parts', 0],
  ['access', 'Permissions are difficult to trust', 1],
  ['rules', 'The same rule lives in five places', 2],
  ['delivery', 'Delivery slows as the product grows', 3],
  ['data', 'Nobody is sure who owns the data', 0],
  ['incidents', 'The same incidents keep returning', 3],
] as const;

export const responsibilities = [
  ['Platform boundaries', 'Keep product growth from becoming system sprawl.'],
  ['Identity and access', 'Make permissions explicit, testable, and safer to change.'],
  ['Complex workflows', 'Turn business rules into behavior the team can reason about.'],
  ['Integration and delivery', 'Connect the moving parts and stay through production.'],
] as const;

export const engagements = [
  { id: 'review', title: 'Architecture Review', eyebrow: 'A second look', description: 'Get another set of eyes on your system, clarify the risks, and leave with a clear path forward.', reasons: ['Permissions are hard to trust', 'The same rule lives in five places', 'Ownership of key parts is unclear'], detail: 'Architecture review, hardening and documentation', icon: 'review' },
  { id: 'stabilization', title: 'System Stabilization', eyebrow: 'Short-term help', description: 'Restore momentum when delivery has slowed, failures repeat, or changes have become harder than they should be.', reasons: ['Delivery slows as the product grows', 'The same incidents keep returning', 'Complex workflows block progress'], detail: 'Scoped around what is needed', icon: 'stabilize' },
  { id: 'alongside', title: 'Work Alongside Your Team', eyebrow: 'Ongoing help', description: 'Embed with your team to guide decisions, work through details, and build systems you can be proud of.', reasons: ['You need senior guidance in the flow of work', 'Complex decisions need a partner', 'Team bandwidth is already stretched'], detail: 'Directly with you and the team', icon: 'team' },
] as const;

// Resolve only known choices, so arbitrary URL text never becomes contact context.
export function getJourneyContext(problemId: string | null, engagementId: string | null) {
  const problem = pressureSignals.find(([id]) => id === problemId);
  const engagement = engagements.find(({ id }) => id === engagementId);
  return { problem: problem?.[1], category: problem ? responsibilities[problem[2]][0] : undefined, engagement: engagement?.title };
}
