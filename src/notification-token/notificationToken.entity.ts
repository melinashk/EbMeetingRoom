/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/user.entity';

@Schema()
export class NotificationToken extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;

  @Prop({ required: true })
  device_type: string;

  @Prop({ required: true })
  notification_token: string;

  @Prop({ default: 'ACTIVE' })
  status: string;
}

export const NotificationTokenSchema = SchemaFactory.createForClass(NotificationToken);