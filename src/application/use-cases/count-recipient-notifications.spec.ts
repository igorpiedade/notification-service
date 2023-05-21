import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Recipient notifications by Id', () => {
  it('Should be able to count recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-recipient-id-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'test-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
