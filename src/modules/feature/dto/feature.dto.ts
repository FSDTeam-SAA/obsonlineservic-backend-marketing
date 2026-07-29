import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

// features[] arrives as a JSON string (or comma-separated string) in multipart/form-data
const parseFeatures = ({ value }: { value: any }) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value.split(',').map((v: string) => v.trim()).filter(Boolean);
    }
  }
  return value;
};

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  bodyText: string;

  @IsOptional()
  @IsArray()
  @Transform(parseFeatures)
  features?: string[];
}

export class UpdateFeatureDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() bodyText?: string;

  @IsOptional()
  @IsArray()
  @Transform(parseFeatures)
  features?: string[];
}

export class GetFeaturesQueryDto {
  @IsOptional() @IsString() page?: string;
  @IsOptional() @IsString() limit?: string;
  @IsOptional() @IsString() search?: string;
}