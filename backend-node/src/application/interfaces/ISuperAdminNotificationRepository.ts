import { SuperAdminNotification } from '../../domain/entities/SuperAdminNotification';

export interface ISuperAdminNotificationRepository {
  create(notification: Omit<SuperAdminNotification, 'id' | 'createdAt'>): Promise<SuperAdminNotification>;
  findById(id: string): Promise<SuperAdminNotification | null>;
  findUnread(): Promise<SuperAdminNotification[]>;
  findAll(): Promise<SuperAdminNotification[]>;
  markAsRead(id: string): Promise<SuperAdminNotification>;
  delete(id: string): Promise<void>;
}
