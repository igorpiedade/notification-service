import { inMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications by Id', () => {
  it('Should be able to list recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'test-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'test-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'test-recipient-id-1' }),
      ]),
    );
  });
});
