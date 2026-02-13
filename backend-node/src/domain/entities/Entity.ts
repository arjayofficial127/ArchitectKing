/**
 * Entity domain entity (person, company, event, other)
 */
export class Entity {
  constructor(
    public readonly id: string,
    public readonly type: 'person' | 'company' | 'event' | 'other',
    public readonly name: string,
    public readonly email: string | null,
    public readonly phone: string | null,
    public readonly website: string | null,
    public readonly imageUrl: string | null,
    public readonly notes: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
