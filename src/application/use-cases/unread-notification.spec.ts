import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnReadNotificationtion } from './unread-notification';

describe('Set notification as Unread', () => {
  it('Should be able to set notification as Unread', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const unReadNotification = new UnReadNotificationtion(
      notificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unReadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull;
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new inMemoryNotificationsRepository();
    const unReadNotification = new UnReadNotificationtion(
      notificationRepository,
    );

    expect(() => {
      return unReadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
