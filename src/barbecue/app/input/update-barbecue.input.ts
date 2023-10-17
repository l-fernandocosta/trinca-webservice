import { PartialType } from '@nestjs/mapped-types';
import { CreateBarbecueInput } from './create-barbecue.input';

export class UpdateBarbecueInput extends PartialType(CreateBarbecueInput) {}
