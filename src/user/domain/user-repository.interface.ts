import { JoinBBQInput } from '@/user/app/input/join-bbq.input';
import { Barbecue, User } from '@prisma/client';

export abstract class UserRepositoryInterface {
  abstract find(id: string): Promise<User>;
  abstract sync(payload: any, headers: any): Promise<void>;
  abstract joinBBQ(input: JoinBBQInput): Promise<void>;
  abstract invitedBarbecues(id: string): Promise<Barbecue[]>;
}
