import { CancelNotificationtion } from './cancel-notifications';
import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  it('Should be able to set notification as canceled', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationtion(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceleddAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new inMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationtion(
      notificationRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'face-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
