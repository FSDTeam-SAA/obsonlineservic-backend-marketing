import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';
import { Feature, FeatureSchema } from './schemas/feature.schema';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../../infrastructure/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }]),
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}