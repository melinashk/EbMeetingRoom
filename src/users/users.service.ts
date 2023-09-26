/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { NotificationService } from '../notification/notification.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { NotificationDto } from '../notification/dtos/NotificationDto';
import { UpdateNotificationDto } from 'src/notification/dtos/updatenotificationDto';
//import { UpdateNotificationDto } from '../notification/dtos/updatenotificationDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly notificationService: NotificationService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async updateProfile(user_id: number, updateDto: any): Promise<any> {
    try {
      const user = await this.userModel.findById(user_id);

      if (user) {
        user.username = updateDto.username;
        user.email = updateDto.email;

        const saved_user = await user.save();

        if (saved_user) {
          await this.notificationService.sendPush(
            saved_user,
            'Profile update',
            'Your profile has been updated successfully',
          );
        }

        return saved_user;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }

  async enablePush(user_id: number, updateDto: NotificationDto): Promise<any> {
    try {
      const user = await this.userModel.findById(user_id);

      if (user) {
        const notificationToken =
          await this.notificationService.acceptNotification(
            user,
            updateDto,
          );

        return notificationToken;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error; 
    }
  }

  async disablePush(
    user_id: number,
    updateDto: UpdateNotificationDto,
  ): Promise<any> {
    try {
      const user = await this.userModel.findById(user_id);

      if (user) {
        await this.notificationService.disableNotification(user, updateDto);

        return 'Push notifications disabled';
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error; 
    }
  }

  async getPushNotifications(): Promise<any> {
    return await this.notificationService.getNotifications();
  }
}
