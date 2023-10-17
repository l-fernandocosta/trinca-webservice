import { BarbecueRepository } from '@/barbecue/domain/barbecue-repository';
import { Injectable } from '@nestjs/common';
import { ConfirmBBQInviteInput } from './input/confirm-bbq-invite.input';
import { CreateBarbecueInput } from './input/create-barbecue.input';
import { FindManyQueryParamsInput } from './input/find-many-query-params.input';

@Injectable()
export class BarbecueService {
  constructor(private readonly repository: BarbecueRepository) {}

  async create(input: CreateBarbecueInput) {
    await this.repository.create(input);
  }

  async findAll(query: FindManyQueryParamsInput) {
    return await this.repository.findMany(query);
  }

  async findOne(id: string) {
    return await this.repository.find(id);
  }

  async findByUserId(id: string) {
    return await this.repository.findByUser(id);
  }

  async invitedBBQS(id: string) {
    return this.repository.invitedBarbecue(id);
  }

  async confirmBBQInvite(input: ConfirmBBQInviteInput) {
    return this.repository.confirmBBQInvite(input);
  }
}
