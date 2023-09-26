/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationToken } from './notificationToken.entity';
import { Model } from 'mongoose';
import { NotificationDto } from '../notification/dtos/NotificationDto';
import { UpdateNotificationDto } from 'src/notification/dtos/updatenotificationDto';

@Injectable()
export class NotificationTokenService {
  constructor(
    @InjectModel(NotificationToken.name) private readonly notificationTokenModel: Model<NotificationToken>,
  ) {}

  async acceptPushNotification(
    user: any,
    notificationDto: NotificationDto,
  ): Promise<NotificationToken> {
    await this.notificationTokenModel.updateMany(
      { user: user._id },
      { status: 'INACTIVE' },
    );

    const notificationToken = new this.notificationTokenModel({
      user: user._id,
      device_type: notificationDto.device_type,
      notification_token: notificationDto.notification_token,
      status: 'ACTIVE',
    });

    await notificationToken.save();

    return notificationToken;
  }

  async disablePushNotification(
      user: any,
      update_dto: UpdateNotificationDto,
    ): Promise<void>{
      try {
        await this.notificationTokenModel.updateMany(
          { user: { id: user.id }, device_type: update_dto.device_type },
          {
            status: 'INACTIVE',
          },
        );
      } catch (error) {
        return error;
      }
    };

    async sendNotificationPush(user: any): Promise<NotificationToken | null> {
      try {
        const notificationToken = await this.notificationTokenModel.findOne({
          user: user._id, 
          status: 'ACTIVE'
        });
        return notificationToken || null
  
      } catch (error) {
        throw error; 
      }
}
}
