import { CreateBarbecueInput } from '@/barbecue/app/input/create-barbecue.input';
import { FindManyQueryParamsInput } from '@/barbecue/app/input/find-many-query-params.input';
import { UpdateBarbecueInput } from '@/barbecue/app/input/update-barbecue.input';
import { Injectable } from '@nestjs/common';
import { Barbecue } from '@prisma/client';

@Injectable()
export abstract class BarbecueRepository {
  abstract findMany(input: FindManyQueryParamsInput): Promise<Barbecue[]>;
  abstract find(id: string): Promise<Barbecue>;
  abstract findByUser(id: string): Promise<Barbecue[]>;
  abstract isAvailableToJoin(bbqId: string): Promise<boolean>;
  abstract isContributionValid(
    bbqId: string,
    contribution: number,
  ): Promise<boolean>;
  abstract create(input: CreateBarbecueInput): Promise<void>;
  abstract update(input: UpdateBarbecueInput, bbqId: string): Promise<void>;
  abstract findBarbecuesByGuest(id: string): Promise<Barbecue[]>;
}
