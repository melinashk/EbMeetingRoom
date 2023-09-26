import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationTokenService } from 'src/notification-token/notification-token.service';
import {
  Notifications,
  NotificationsSchema,
} from 'src/notification/notification.entity';
import {
  NotificationToken,
  NotificationTokenSchema,
} from 'src/notification-token/notificationToken.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Notifications.name, schema: NotificationsSchema },
      { name: NotificationToken.name, schema: NotificationTokenSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, NotificationService, NotificationTokenService],
})
export class UsersModule {}
