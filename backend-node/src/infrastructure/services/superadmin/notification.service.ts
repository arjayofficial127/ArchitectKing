import { injectable } from 'tsyringe';
import { ISuperAdminNotificationRepository } from '../../../application/interfaces/ISuperAdminNotificationRepository';
import { SuperAdminNotification } from '../../../domain/entities/SuperAdminNotification';
import { NotFoundError } from '../../../core/errors/AppError';

@injectable()
export class NotificationService {
  constructor(private notificationRepo: ISuperAdminNotificationRepository) {}

  async createNotification(
    type: 'booking_request' | 'system' | 'reminder',
    relatedId?: string
  ): Promise<SuperAdminNotification> {
    return this.notificationRepo.create({
      type,
      relatedId: relatedId || null,
      read: false,
    });
  }

  async getUnreadNotifications(): Promise<SuperAdminNotification[]> {
    return this.notificationRepo.findUnread();
  }

  async getAllNotifications(): Promise<SuperAdminNotification[]> {
    return this.notificationRepo.findAll();
  }

  async markAsRead(notificationId: string): Promise<SuperAdminNotification> {
    const notification = await this.notificationRepo.findById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification', notificationId);
    }

    return this.notificationRepo.markAsRead(notificationId);
  }
}
