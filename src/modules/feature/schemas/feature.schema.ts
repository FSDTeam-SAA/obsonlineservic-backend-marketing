import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Feature {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  bodyText: string;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ default: '' })
  image?: string;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
export type FeatureDocument = HydratedDocument<Feature>;