import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestDemoController } from './request-demo.controller';
import { RequestDemoService } from './request-demo.service';
import { RequestDemo, RequestDemoSchema } from './schemas/request-demo.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RequestDemo.name, schema: RequestDemoSchema }]),
    AuthModule,
  ],
  controllers: [RequestDemoController],
  providers: [RequestDemoService],
})
export class RequestDemoModule {}