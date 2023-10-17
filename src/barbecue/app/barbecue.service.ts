import { BarbecueRepository } from '@/barbecue/domain/barbecue-repository';
import { Injectable } from '@nestjs/common';
import { CreateBarbecueInput } from './input/create-barbecue.input';
import { FindManyQueryParamsInput } from './input/find-many-query-params.input';
import { UpdateBarbecueInput } from './input/update-barbecue.input';

@Injectable()
export class BarbecueService {
  constructor(private readonly repository: BarbecueRepository) {}

  create(input: CreateBarbecueInput) {
    return 'This action adds a new barbecue';
  }

  async findAll(query: FindManyQueryParamsInput) {
    return await this.repository.findMany(query);
  }

  async findOne(id: string) {
    return await this.repository.find(id);
  }

  update(id: number, input: UpdateBarbecueInput) {
    return `This action updates a #${id} barbecue`;
  }

  remove(id: number) {
    return `This action removes a #${id} barbecue`;
  }
}
