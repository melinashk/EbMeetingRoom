import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifications, NotificationsSchema } from './notification.entity';
import {
  NotificationToken,
  NotificationTokenSchema,
} from 'src/notification-token/notificationToken.entity';
import { NotificationTokenService } from 'src/notification-token/notification-token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notifications.name, schema: NotificationsSchema },
      { name: NotificationToken.name, schema: NotificationTokenSchema },
    ]),
  ],
  providers: [NotificationService, NotificationTokenService],
  exports: [NotificationService],
})
export class NotificationModule {}
