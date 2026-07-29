import {
  IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber, IsBoolean, IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRequestDemoDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() phoneNumber: string;

  @IsEmail() @IsNotEmpty() email: string;

  @IsString() @IsNotEmpty() location: string;

  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() holidayHomes?: number;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() campingPitches?: number;
  @IsOptional() @Transform(({ value }) => Number(value)) @IsNumber() rooms?: number;

  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true' || value === 'yes')
  @IsBoolean()
  isRentingOnBehalf?: boolean;

  @IsOptional() @IsDateString() desiredDate?: string;
  @IsOptional() @IsString() preferredTime?: string;
  @IsOptional() @IsString() message?: string;
}

export class GetRequestDemosQueryDto {
  @IsOptional() @IsString() page?: string;
  @IsOptional() @IsString() limit?: string;
  @IsOptional() @IsString() search?: string;
}