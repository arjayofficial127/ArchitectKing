import { SuperAdminFile } from '../../domain/entities/SuperAdminFile';

export interface ISuperAdminFileRepository {
  create(file: Omit<SuperAdminFile, 'id' | 'createdAt' | 'updatedAt'>): Promise<SuperAdminFile>;
  findById(id: string): Promise<SuperAdminFile | null>;
  findByFolderId(folderId: string | null): Promise<SuperAdminFile[]>;
  update(id: string, updates: Partial<SuperAdminFile>): Promise<SuperAdminFile>;
  delete(id: string): Promise<void>;
}
