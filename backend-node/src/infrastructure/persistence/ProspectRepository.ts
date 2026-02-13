import { injectable } from 'tsyringe';
import { eq, and, arrayContains } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { prospectsTable } from '../db/drizzle/schema';
import { IProspectRepository } from '../../application/interfaces/IProspectRepository';
import { Prospect } from '../../domain/entities/Prospect';

@injectable()
export class ProspectRepository implements IProspectRepository {
  async create(prospect: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>): Promise<Prospect> {
    const now = new Date();
    const [created] = await db
      .insert(prospectsTable)
      .values({
        type: prospect.type,
        name: prospect.name,
        targetBudget: prospect.targetBudget ? prospect.targetBudget.toString() : null,
        status: prospect.status,
        swimlane: prospect.swimlane ?? null,
        tags: prospect.tags,
        notes: prospect.notes ?? null,
        websiteUrl: prospect.websiteUrl ?? null,
        imageUrl: prospect.imageUrl ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Prospect | null> {
    const [prospect] = await db
      .select()
      .from(prospectsTable)
      .where(eq(prospectsTable.id, id))
      .limit(1);

    if (!prospect) return null;
    return this.mapToEntity(prospect);
  }

  async findAll(filters?: { status?: string; swimlane?: string; tags?: string[] }): Promise<Prospect[]> {
    let prospects;
    if (filters?.status && filters?.swimlane) {
      prospects = await db
        .select()
        .from(prospectsTable)
        .where(and(eq(prospectsTable.status, filters.status as any), eq(prospectsTable.swimlane, filters.swimlane)));
    } else if (filters?.status) {
      prospects = await db
        .select()
        .from(prospectsTable)
        .where(eq(prospectsTable.status, filters.status as any));
    } else if (filters?.swimlane) {
      prospects = await db
        .select()
        .from(prospectsTable)
        .where(eq(prospectsTable.swimlane, filters.swimlane));
    } else {
      prospects = await db.select().from(prospectsTable);
    }

    let result = prospects.map((p) => this.mapToEntity(p));

    // Filter by tags in memory if needed
    if (filters?.tags && filters.tags.length > 0) {
      result = result.filter((p) => filters.tags!.some((tag) => p.tags.includes(tag)));
    }

    return result;
  }

  async update(id: string, updates: Partial<Prospect>): Promise<Prospect> {
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (updates.type !== undefined) updateData.type = updates.type;
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.targetBudget !== undefined) {
      updateData.targetBudget = updates.targetBudget ? updates.targetBudget.toString() : null;
    }
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.swimlane !== undefined) updateData.swimlane = updates.swimlane;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.websiteUrl !== undefined) updateData.websiteUrl = updates.websiteUrl;
    if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl;

    const [updated] = await db
      .update(prospectsTable)
      .set(updateData)
      .where(eq(prospectsTable.id, id))
      .returning();

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await db.delete(prospectsTable).where(eq(prospectsTable.id, id));
  }

  private mapToEntity(row: any): Prospect {
    return new Prospect(
      row.id,
      row.type,
      row.name,
      row.targetBudget ? parseFloat(row.targetBudget) : null,
      row.status,
      row.swimlane,
      row.tags || [],
      row.notes,
      row.websiteUrl,
      row.imageUrl,
      row.createdAt,
      row.updatedAt
    );
  }
}
