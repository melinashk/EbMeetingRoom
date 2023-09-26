/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop({default: 'ACTIVE'})
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
