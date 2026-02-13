import { injectable } from 'tsyringe';
import { eq, isNull } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { superAdminFilesTable } from '../db/drizzle/schema';
import { ISuperAdminFileRepository } from '../../application/interfaces/ISuperAdminFileRepository';
import { SuperAdminFile } from '../../domain/entities/SuperAdminFile';

@injectable()
export class SuperAdminFileRepository implements ISuperAdminFileRepository {
  async create(file: Omit<SuperAdminFile, 'id' | 'createdAt' | 'updatedAt'>): Promise<SuperAdminFile> {
    const now = new Date();
    const [created] = await db
      .insert(superAdminFilesTable)
      .values({
        folderId: file.folderId ?? null,
        name: file.name,
        fileType: file.fileType,
        content: file.content,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return new SuperAdminFile(
      created.id,
      created.folderId,
      created.name,
      created.fileType as 'txt' | 'md' | 'rtf',
      created.content,
      created.createdAt,
      created.updatedAt
    );
  }

  async findById(id: string): Promise<SuperAdminFile | null> {
    const [file] = await db
      .select()
      .from(superAdminFilesTable)
      .where(eq(superAdminFilesTable.id, id))
      .limit(1);

    if (!file) return null;

    return new SuperAdminFile(
      file.id,
      file.folderId,
      file.name,
      file.fileType as 'txt' | 'md' | 'rtf',
      file.content,
      file.createdAt,
      file.updatedAt
    );
  }

  async findByFolderId(folderId: string | null): Promise<SuperAdminFile[]> {
    const files = await db
      .select()
      .from(superAdminFilesTable)
      .where(folderId === null ? isNull(superAdminFilesTable.folderId) : eq(superAdminFilesTable.folderId, folderId));

    return files.map(
      (f) =>
        new SuperAdminFile(
          f.id,
          f.folderId,
          f.name,
          f.fileType as 'txt' | 'md' | 'rtf',
          f.content,
          f.createdAt,
          f.updatedAt
        )
    );
  }

  async update(id: string, updates: Partial<SuperAdminFile>): Promise<SuperAdminFile> {
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (updates.folderId !== undefined) updateData.folderId = updates.folderId;
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.fileType !== undefined) updateData.fileType = updates.fileType;
    if (updates.content !== undefined) updateData.content = updates.content;

    const [updated] = await db
      .update(superAdminFilesTable)
      .set(updateData)
      .where(eq(superAdminFilesTable.id, id))
      .returning();

    return new SuperAdminFile(
      updated.id,
      updated.folderId,
      updated.name,
      updated.fileType as 'txt' | 'md' | 'rtf',
      updated.content,
      updated.createdAt,
      updated.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(superAdminFilesTable).where(eq(superAdminFilesTable.id, id));
  }
}
