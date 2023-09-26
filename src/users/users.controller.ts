/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { NotificationDto } from '../notification/dtos/NotificationDto';
import { UpdateNotificationDto } from 'src/notification/dtos/updatenotificationDto';
import { UpdateUserDto } from './dtos/updateUser.dto';
// import { UpdateNotificationDto } from '../notification/dtos/updatenotificationDto';
// import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async CreateUser(@Body() user: CreateUserDto) {
    return await this.usersService.createUser(user);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Body() updateDto: UpdateUserDto,
    @Param('id') user_id: number,
  ) {
    return await this.usersService.updateProfile(user_id, updateDto);
  }

  @Patch(':id/push/enable')
  @HttpCode(HttpStatus.OK)
  async enablePush(
    @Body() updateDto: NotificationDto,
    @Param('id') user_id: number,
  ) {
    return await this.usersService.enablePush(user_id, updateDto);
  }

  @Patch(':id/push/disable')
  @HttpCode(HttpStatus.OK)
  async disablePush(
    @Param('id') user_id: number,
    @Body() updateDto: UpdateNotificationDto,
  ) {
    return await this.usersService.disablePush(user_id, updateDto);
  }

  @Get('push/notifications')
  @HttpCode(HttpStatus.OK)
  async fetchPushNotifications() {
    return await this.usersService.getPushNotifications();
  }
}
