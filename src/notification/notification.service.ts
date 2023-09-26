/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifications } from './notification.entity';
import { NotificationDto } from './dtos/NotificationDto';
//import { UpdateNotificationDto } from './dtos/updatenotificationDto';
import { NotificationTokenService } from '../notification-token/notification-token.service';
import { UpdateNotificationDto } from './dtos/updatenotificationDto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notifications.name) private readonly notificationModel: Model<Notifications>,
    private readonly notificationTokenService: NotificationTokenService
  ) {
    if (!firebaseAdmin.apps.length) {
    try {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          path.join(__dirname, "..", "..", "firebase-admin-sdk.json")
        ),
      }, "youruniquefirebase")
    } catch(error) {
      throw new Error(error)
    }
  }
}

  async acceptNotification(user: any, notificationDto: NotificationDto) {
    const notificationToken = await this.notificationTokenService.acceptPushNotification(user, notificationDto);
    console.log(notificationToken)
  }

  async disableNotification(user: any, update_dto: UpdateNotificationDto) {
    const notificationToken = await this.notificationTokenService.disablePushNotification(user, update_dto)
    console.log(notificationToken)
  }

  getNotifications = async (): Promise<any> => {
    return await this.notificationModel.find();
  };

  async sendPush(user: any, title: string, body: string): Promise<void> {
    try {
      const notification = await this.notificationTokenService.sendNotificationPush(user);

      if (notification) {
        const newNotification = new this.notificationModel({
          notification_token: notification.notification_token,
          title,
          body,
          status: 'ACTIVE',
          created_by: user.username,
        });

        await newNotification.save();

        await firebaseAdmin.messaging().send({
          notification: { title, body },
          token: notification.notification_token,
          android: { priority: 'high' },
        });
      }
    } catch (error) {
      throw error;
    }
  }

}
