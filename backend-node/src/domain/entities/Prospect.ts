/**
 * Prospect domain entity
 */
export class Prospect {
  constructor(
    public readonly id: string,
    public readonly type: 'person' | 'company',
    public readonly name: string,
    public readonly targetBudget: number | null,
    public readonly status: 'new' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'lost' | 'other',
    public readonly swimlane: string | null,
    public readonly tags: string[],
    public readonly notes: string | null,
    public readonly websiteUrl: string | null,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
