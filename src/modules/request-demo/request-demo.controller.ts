import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { RequestDemoService } from './request-demo.service';
import { CreateRequestDemoDto, GetRequestDemosQueryDto } from './dto/request-demo.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { RoleType } from '../../common/enums/role.enum';

@Controller('request-demo')
@UseGuards(JwtAuthGuard)
export class RequestDemoController {
  constructor(private readonly requestDemoService: RequestDemoService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateRequestDemoDto) {
    return this.requestDemoService.create(dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  findAll(@Query() query: GetRequestDemosQueryDto) {
    return this.requestDemoService.findAll(query);
  }

  @Get('count')
@UseGuards(RolesGuard)
@Roles(RoleType.ADMIN)
count() {
  return this.requestDemoService.count();
}

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  findOne(@Param('id') id: string) {
    return this.requestDemoService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  remove(@Param('id') id: string) {
    return this.requestDemoService.remove(id);
  }
}