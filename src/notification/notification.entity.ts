/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { NotificationToken } from '../notification-token/notificationToken.entity';

@Schema()
export class Notifications {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => NotificationToken})
  notificationToken: string;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  createdBy: string;

  @Prop({default: 'ACTIVE'})
  status: string;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications)
