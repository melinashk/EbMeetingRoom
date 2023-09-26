import { Module } from '@nestjs/common';
import { NotificationTokenService } from './notification-token.service';
import { NotificationTokenController } from './notification-token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationToken,
  NotificationTokenSchema,
} from './notificationToken.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationToken.name, schema: NotificationTokenSchema },
    ]),
  ],
  controllers: [NotificationTokenController],
  providers: [NotificationTokenService],
})
export class NotificationTokenModule {}
