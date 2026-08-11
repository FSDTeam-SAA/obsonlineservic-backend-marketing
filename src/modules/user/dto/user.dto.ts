import {
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() username?: string;
  @IsOptional() @IsDateString() dob?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEnum(['male', 'female', 'other']) gender?: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() language?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() cityState?: string;
  @IsOptional() @IsString() roadArea?: string;
  @IsOptional() @IsString() postalCode?: string;
  @IsOptional() @IsString() taxId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  })
  @IsObject()
  address?: Record<string, string>;

  @IsOptional() @IsString() 'address.country'?: string;
  @IsOptional() @IsString() 'address.cityState'?: string;
  @IsOptional() @IsString() 'address.roadArea'?: string;
  @IsOptional() @IsString() 'address.postalCode'?: string;
  @IsOptional() @IsString() 'address.taxId'?: string;
}

export class GetUsersQueryDto {
  @IsOptional() @IsString() page?: string;
  @IsOptional() @IsString() limit?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() date?: string;
}

export class AdminUpdateUserDto extends UpdateUserDto {
  @IsOptional() @IsEnum(['USER', 'ADMIN']) role?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  hasActiveSubscription?: boolean;
}
