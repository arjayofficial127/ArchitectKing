import { Entity } from '../../domain/entities/Entity';

export interface IEntityRepository {
  create(entity: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Entity>;
  findById(id: string): Promise<Entity | null>;
  findByEmail(email: string): Promise<Entity | null>;
  findByType(type: 'person' | 'company' | 'event' | 'other'): Promise<Entity[]>;
  update(id: string, updates: Partial<Entity>): Promise<Entity>;
  delete(id: string): Promise<void>;
}
