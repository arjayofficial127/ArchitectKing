import { Prospect } from '../../domain/entities/Prospect';

export interface IProspectRepository {
  create(prospect: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>): Promise<Prospect>;
  findById(id: string): Promise<Prospect | null>;
  findAll(filters?: {
    status?: string;
    swimlane?: string;
    tags?: string[];
  }): Promise<Prospect[]>;
  update(id: string, updates: Partial<Prospect>): Promise<Prospect>;
  delete(id: string): Promise<void>;
}
