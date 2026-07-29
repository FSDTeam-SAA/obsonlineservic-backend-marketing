import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Faq {
  @Prop({ required: true, trim: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
export type FaqDocument = HydratedDocument<Faq>;