/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationTokenModule } from './notification-token/notification-token.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://melinashakya20:melina20@cluster0.sbnak9d.mongodb.net/notofication?retryWrites=true&w=majority'),
    NotificationModule, 
    UsersModule, NotificationTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
