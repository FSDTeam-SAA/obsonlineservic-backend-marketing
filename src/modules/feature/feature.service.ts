import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature, FeatureDocument } from './schemas/feature.schema';
import { CreateFeatureDto, UpdateFeatureDto, GetFeaturesQueryDto } from './dto/feature.dto';
import { CloudinaryService } from '../../infrastructure/cloudinary/cloudinary.service';
import { createFilter, createMeta, createPaginationInfo } from '../../common/utils/pagination.util';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name) private readonly featureModel: Model<FeatureDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateFeatureDto, file?: Express.Multer.File) {
    let image = '';
    if (file) {
      const result = await this.cloudinaryService.upload(file.path, `feature-${Date.now()}`, 'features');
      image = result.url;
    }

    const feature = await this.featureModel.create({ ...dto, image });
    return { message: 'Feature created successfully', data: feature };
  }

  async findAll(query: GetFeaturesQueryDto) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const filter = createFilter(query.search, undefined, { searchField: 'title' });

    const total = await this.featureModel.countDocuments(filter);
    const features = await this.featureModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      message: 'Features fetched successfully',
      meta: createMeta(page, limit, total),
      data: { features, paginationInfo: createPaginationInfo(page, limit, total) },
    };
  }

  async findOne(id: string) {
    const feature = await this.featureModel.findById(id);
    if (!feature) throw new HttpException('Feature not found', HttpStatus.NOT_FOUND);
    return { message: 'Feature fetched successfully', data: feature };
  }

  async update(id: string, dto: UpdateFeatureDto, file?: Express.Multer.File) {
    const feature = await this.featureModel.findById(id);
    if (!feature) throw new HttpException('Feature not found', HttpStatus.NOT_FOUND);

    const updateData: any = { ...dto };

    if (file) {
      if (feature.image) await this.cloudinaryService.delete(feature.image);
      const result = await this.cloudinaryService.upload(file.path, `feature-${Date.now()}`, 'features');
      updateData.image = result.url;
    }

    const updated = await this.featureModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return { message: 'Feature updated successfully', data: updated };
  }

  async remove(id: string) {
    const feature = await this.featureModel.findById(id);
    if (!feature) throw new HttpException('Feature not found', HttpStatus.NOT_FOUND);

    if (feature.image) await this.cloudinaryService.delete(feature.image);
    await this.featureModel.findByIdAndDelete(id);

    return { message: 'Feature deleted successfully', data: null };
  }
}