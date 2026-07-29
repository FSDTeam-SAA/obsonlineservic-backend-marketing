import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class RequestDemo {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: 0 }) holidayHomes: number;
  @Prop({ default: 0 }) campingPitches: number;
  @Prop({ default: 0 }) rooms: number;

  @Prop({ default: false })
  isRentingOnBehalf: boolean;

  @Prop({ default: null })
  desiredDate?: Date;

  @Prop({ default: '' })
  preferredTime?: string;

  @Prop({ default: '' })
  message?: string;
}

export const RequestDemoSchema = SchemaFactory.createForClass(RequestDemo);
export type RequestDemoDocument = HydratedDocument<RequestDemo>;