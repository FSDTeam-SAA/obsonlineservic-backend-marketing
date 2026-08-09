import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestDemo, RequestDemoDocument } from './schemas/request-demo.schema';
import { CreateRequestDemoDto, GetRequestDemosQueryDto } from './dto/request-demo.dto';
import { createFilter, createMeta, createPaginationInfo } from '../../common/utils/pagination.util';

@Injectable()
export class RequestDemoService {
  constructor(
    @InjectModel(RequestDemo.name) private readonly requestDemoModel: Model<RequestDemoDocument>,
  ) {}

  async create(dto: CreateRequestDemoDto) {
    const demo = await this.requestDemoModel.create(dto);
    return { message: 'Demo request submitted successfully', data: demo };
  }
  async count() {
  const total = await this.requestDemoModel.countDocuments();
  return { message: 'Total demo requests count fetched successfully', data: { total } };
}

  async findAll(query: GetRequestDemosQueryDto) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const filter = createFilter(query.search, undefined, { searchField: 'name' });

    const total = await this.requestDemoModel.countDocuments(filter);
    const demos = await this.requestDemoModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      message: 'Demo requests fetched successfully',
      meta: createMeta(page, limit, total),
      data: { demos, paginationInfo: createPaginationInfo(page, limit, total) },
    };
  }

  async findOne(id: string) {
    const demo = await this.requestDemoModel.findById(id);
    if (!demo) throw new HttpException('Demo request not found', HttpStatus.NOT_FOUND);
    return { message: 'Demo request fetched successfully', data: demo };
  }

  async remove(id: string) {
    const deleted = await this.requestDemoModel.findByIdAndDelete(id);
    if (!deleted) throw new HttpException('Demo request not found', HttpStatus.NOT_FOUND);
    return { message: 'Demo request deleted successfully', data: null };
  }
}