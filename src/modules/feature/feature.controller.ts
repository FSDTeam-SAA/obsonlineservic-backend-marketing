import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  UseGuards, UseInterceptors, UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { FeatureService } from './feature.service';
import { CreateFeatureDto, UpdateFeatureDto, GetFeaturesQueryDto } from './dto/feature.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { RoleType } from '../../common/enums/role.enum';

const multerStorage = diskStorage({
  destination: (req, file, cb) => {
    const folder = 'uploads/images';
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

@Controller('feature')
@UseGuards(JwtAuthGuard)
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], { storage: multerStorage }))
  create(
    @Body() dto: CreateFeatureDto,
    @UploadedFiles() files: { image?: Express.Multer.File[] },
  ) {
    return this.featureService.create(dto, files?.image?.[0]);
  }

  @Public()
  @Get()
  findAll(@Query() query: GetFeaturesQueryDto) {
    return this.featureService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], { storage: multerStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFeatureDto,
    @UploadedFiles() files: { image?: Express.Multer.File[] },
  ) {
    return this.featureService.update(id, dto, files?.image?.[0]);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  remove(@Param('id') id: string) {
    return this.featureService.remove(id);
  }
}