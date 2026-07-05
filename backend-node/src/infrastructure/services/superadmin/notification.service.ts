import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../core/di/types';
import { ISuperAdminNotificationRepository } from '../../../application/interfaces/ISuperAdminNotificationRepository';
import { IBookingRequestRepository } from '../../../application/interfaces/IBookingRequestRepository';
import { ICalendarEventRepository } from '../../../application/interfaces/ICalendarEventRepository';
import { SuperAdminNotification } from '../../../domain/entities/SuperAdminNotification';
import { NotFoundError } from '../../../core/errors/AppError';

export interface DetailedNotification extends SuperAdminNotification {
  booking?: {
    id: string;
    name: string;
    email: string;
    message: string | null;
    status: string;
    timezoneAtBooking: string | null;
    calendarEventId: string;
    event: {
      id: string;
      title: string;
      startDatetime: Date;
      endDatetime: Date;
      timezone: string;
    } | null;
  };
}

@injectable()
export class NotificationService {
  constructor(
    @inject(TYPES.ISuperAdminNotificationRepository) private notificationRepo: ISuperAdminNotificationRepository,
    @inject(TYPES.IBookingRequestRepository) private bookingRequestRepo: IBookingRequestRepository,
    @inject(TYPES.ICalendarEventRepository) private calendarEventRepo: ICalendarEventRepository
  ) {}

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

  async getUnreadNotificationsDetailed(): Promise<DetailedNotification[]> {
    return this.enrich(await this.notificationRepo.findUnread());
  }

  async getAllNotificationsDetailed(): Promise<DetailedNotification[]> {
    return this.enrich(await this.notificationRepo.findAll());
  }

  /** Attach booking + slot details when the notification points at a booking */
  private async enrich(notifications: SuperAdminNotification[]): Promise<DetailedNotification[]> {
    return Promise.all(
      notifications.map(async (n): Promise<DetailedNotification> => {
        if (!n.relatedId) return n;
        const booking = await this.bookingRequestRepo.findById(n.relatedId);
        if (!booking) return n;
        const event = await this.calendarEventRepo.findById(booking.calendarEventId);
        return {
          ...n,
          booking: {
            id: booking.id,
            name: booking.name,
            email: booking.email,
            message: booking.message,
            status: booking.status,
            timezoneAtBooking: booking.timezoneAtBooking,
            calendarEventId: booking.calendarEventId,
            event: event
              ? {
                  id: event.id,
                  title: event.title,
                  startDatetime: event.startDatetime,
                  endDatetime: event.endDatetime,
                  timezone: event.timezone,
                }
              : null,
          },
        };
      })
    );
  }

  async markAsRead(notificationId: string): Promise<SuperAdminNotification> {
    const notification = await this.notificationRepo.findById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification', notificationId);
    }

    return this.notificationRepo.markAsRead(notificationId);
  }
}
