import { injectable } from 'tsyringe';
import { eq, isNull } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { foldersTable } from '../db/drizzle/schema';
import { IFolderRepository } from '../../application/interfaces/IFolderRepository';
import { Folder } from '../../domain/entities/Folder';

@injectable()
export class FolderRepository implements IFolderRepository {
  async create(folder: Omit<Folder, 'id' | 'createdAt'>): Promise<Folder> {
    const [created] = await db
      .insert(foldersTable)
      .values({
        parentFolderId: folder.parentFolderId ?? null,
        name: folder.name,
        ownerUserId: folder.ownerUserId,
      })
      .returning();

    return new Folder(
      created.id,
      created.parentFolderId,
      created.name,
      created.ownerUserId,
      created.createdAt
    );
  }

  async findById(id: string): Promise<Folder | null> {
    const [folder] = await db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.id, id))
      .limit(1);

    if (!folder) return null;

    return new Folder(
      folder.id,
      folder.parentFolderId,
      folder.name,
      folder.ownerUserId,
      folder.createdAt
    );
  }

  async findByOwnerUserId(ownerUserId: string): Promise<Folder[]> {
    const folders = await db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.ownerUserId, ownerUserId));

    return folders.map(
      (f) => new Folder(f.id, f.parentFolderId, f.name, f.ownerUserId, f.createdAt)
    );
  }

  async findByParentFolderId(parentFolderId: string | null): Promise<Folder[]> {
    const folders = await db
      .select()
      .from(foldersTable)
      .where(parentFolderId === null ? isNull(foldersTable.parentFolderId) : eq(foldersTable.parentFolderId, parentFolderId));

    return folders.map(
      (f) => new Folder(f.id, f.parentFolderId, f.name, f.ownerUserId, f.createdAt)
    );
  }

  async update(id: string, updates: Partial<Folder>): Promise<Folder> {
    const updateData: any = {};

    if (updates.parentFolderId !== undefined) updateData.parentFolderId = updates.parentFolderId;
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.ownerUserId !== undefined) updateData.ownerUserId = updates.ownerUserId;

    const [updated] = await db
      .update(foldersTable)
      .set(updateData)
      .where(eq(foldersTable.id, id))
      .returning();

    return new Folder(
      updated.id,
      updated.parentFolderId,
      updated.name,
      updated.ownerUserId,
      updated.createdAt
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(foldersTable).where(eq(foldersTable.id, id));
  }
}
