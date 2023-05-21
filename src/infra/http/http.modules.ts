import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notification.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotificationtion } from '@application/use-cases/cancel-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotificationtion } from '@application/use-cases/read-notification';
import { UnReadNotificationtion } from '@application/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotificationtion,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotificationtion,
    UnReadNotificationtion,
  ],
})
export class HttpModule {}
