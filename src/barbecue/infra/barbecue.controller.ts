import { BarbecueService } from '@/barbecue/app/barbecue.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('barbecue')
export class BarbecueController {
  constructor(private readonly barbecueService: BarbecueService) {}

  @Get()
  findAll(@Query('from') from?: string, @Query('to') to?: string) {
    return this.barbecueService.findAll({
      to,
      from,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barbecueService.findOne(id);
  }
}