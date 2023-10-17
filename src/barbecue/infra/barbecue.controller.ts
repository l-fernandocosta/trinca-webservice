import { BarbecueService } from '@/barbecue/app/barbecue.service';
import { ConfirmBBQInviteInput } from '@/barbecue/app/input/confirm-bbq-invite.input';
import { CreateBarbecueInput } from '@/barbecue/app/input/create-barbecue.input';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('barbecue')
export class BarbecueController {
  constructor(private readonly barbecueService: BarbecueService) {}

  @Get()
  findAll(
    @Query('userid') userid: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.barbecueService.findAll({
      to,
      from,
      userid,
    });
  }

  @Post()
  async create(@Body() input: CreateBarbecueInput) {
    await this.barbecueService.create(input);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barbecueService.findOne(id);
  }

  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.barbecueService.findByUserId(id);
  }

  @Get('/user/invited/:id')
  invitedBarbecues(@Param('id') id: string) {
    return this.barbecueService.invitedBBQS(id);
  }

  @Patch('/guest/confirm')
  confirmBBQInvite(@Body() input: ConfirmBBQInviteInput) {
    return this.barbecueService.confirmBBQInvite(input);
  }
}
