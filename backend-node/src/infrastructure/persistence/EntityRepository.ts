import { injectable } from 'tsyringe';
import { eq } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { entitiesTable } from '../db/drizzle/schema';
import { IEntityRepository } from '../../application/interfaces/IEntityRepository';
import { Entity } from '../../domain/entities/Entity';

@injectable()
export class EntityRepository implements IEntityRepository {
  async create(entity: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Entity> {
    const now = new Date();
    const [created] = await db
      .insert(entitiesTable)
      .values({
        type: entity.type,
        name: entity.name,
        email: entity.email ?? null,
        phone: entity.phone ?? null,
        website: entity.website ?? null,
        imageUrl: entity.imageUrl ?? null,
        notes: entity.notes ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return new Entity(
      created.id,
      created.type,
      created.name,
      created.email,
      created.phone,
      created.website,
      created.imageUrl,
      created.notes,
      created.createdAt,
      created.updatedAt
    );
  }

  async findById(id: string): Promise<Entity | null> {
    const [entity] = await db
      .select()
      .from(entitiesTable)
      .where(eq(entitiesTable.id, id))
      .limit(1);

    if (!entity) return null;

    return new Entity(
      entity.id,
      entity.type,
      entity.name,
      entity.email,
      entity.phone,
      entity.website,
      entity.imageUrl,
      entity.notes,
      entity.createdAt,
      entity.updatedAt
    );
  }

  async findByEmail(email: string): Promise<Entity | null> {
    const [entity] = await db
      .select()
      .from(entitiesTable)
      .where(eq(entitiesTable.email, email))
      .limit(1);

    if (!entity) return null;

    return new Entity(
      entity.id,
      entity.type,
      entity.name,
      entity.email,
      entity.phone,
      entity.website,
      entity.imageUrl,
      entity.notes,
      entity.createdAt,
      entity.updatedAt
    );
  }

  async findByType(type: 'person' | 'company' | 'event' | 'other'): Promise<Entity[]> {
    const entities = await db
      .select()
      .from(entitiesTable)
      .where(eq(entitiesTable.type, type));

    return entities.map(
      (e) =>
        new Entity(
          e.id,
          e.type,
          e.name,
          e.email,
          e.phone,
          e.website,
          e.imageUrl,
          e.notes,
          e.createdAt,
          e.updatedAt
        )
    );
  }

  async update(id: string, updates: Partial<Entity>): Promise<Entity> {
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (updates.type !== undefined) updateData.type = updates.type;
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.website !== undefined) updateData.website = updates.website;
    if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl;
    if (updates.notes !== undefined) updateData.notes = updates.notes;

    const [updated] = await db
      .update(entitiesTable)
      .set(updateData)
      .where(eq(entitiesTable.id, id))
      .returning();

    return new Entity(
      updated.id,
      updated.type,
      updated.name,
      updated.email,
      updated.phone,
      updated.website,
      updated.imageUrl,
      updated.notes,
      updated.createdAt,
      updated.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(entitiesTable).where(eq(entitiesTable.id, id));
  }
}
