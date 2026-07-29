import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './schemas/faq.schema';
import { CreateFaqDto, UpdateFaqDto, GetFaqsQueryDto } from './dto/faq.dto';
import { createFilter, createMeta, createPaginationInfo } from '../../common/utils/pagination.util';

@Injectable()
export class FaqService {
  constructor(@InjectModel(Faq.name) private readonly faqModel: Model<FaqDocument>) {}

  async create(dto: CreateFaqDto) {
    const faq = await this.faqModel.create(dto);
    return { message: 'FAQ created successfully', data: faq };
  }

  async findAll(query: GetFaqsQueryDto) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const filter = createFilter(query.search, undefined, { searchField: 'question' });

    const total = await this.faqModel.countDocuments(filter);
    const faqs = await this.faqModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      message: 'FAQs fetched successfully',
      meta: createMeta(page, limit, total),
      data: { faqs, paginationInfo: createPaginationInfo(page, limit, total) },
    };
  }

  async findOne(id: string) {
    const faq = await this.faqModel.findById(id);
    if (!faq) throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
    return { message: 'FAQ fetched successfully', data: faq };
  }

  async update(id: string, dto: UpdateFaqDto) {
    const updated = await this.faqModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true });
    if (!updated) throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
    return { message: 'FAQ updated successfully', data: updated };
  }

  async remove(id: string) {
    const deleted = await this.faqModel.findByIdAndDelete(id);
    if (!deleted) throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
    return { message: 'FAQ deleted successfully', data: null };
  }
}