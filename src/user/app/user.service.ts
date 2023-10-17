import { UserRepositoryInterface } from '@/user/domain/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { JoinBBQInput } from './input/join-bbq.input';
import { UpdateUserInput } from './input/update-user.input';

@Injectable()
export class UserService {
  constructor(private repository: UserRepositoryInterface) {}

  sync(payload: any, headers: any): Promise<void> {
    return this.repository.sync(payload, headers);
  }

  async join(input: JoinBBQInput): Promise<void> {
    return this.repository.joinBBQ(input);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
