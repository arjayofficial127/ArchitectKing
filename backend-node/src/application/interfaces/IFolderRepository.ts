import { Folder } from '../../domain/entities/Folder';

export interface IFolderRepository {
  create(folder: Omit<Folder, 'id' | 'createdAt'>): Promise<Folder>;
  findById(id: string): Promise<Folder | null>;
  findByOwnerUserId(ownerUserId: string): Promise<Folder[]>;
  findByParentFolderId(parentFolderId: string | null): Promise<Folder[]>;
  update(id: string, updates: Partial<Folder>): Promise<Folder>;
  delete(id: string): Promise<void>;
}
