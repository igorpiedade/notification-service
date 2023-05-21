import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotificationtion } from './read-notification';

describe('Set notification as read', () => {
  it('Should be able to set notification as ', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const readNotification = new ReadNotificationtion(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new inMemoryNotificationsRepository();
    const readNotification = new ReadNotificationtion(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'face-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
