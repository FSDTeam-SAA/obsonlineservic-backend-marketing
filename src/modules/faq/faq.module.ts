import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { Faq, FaqSchema } from './schemas/faq.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
    AuthModule,
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}