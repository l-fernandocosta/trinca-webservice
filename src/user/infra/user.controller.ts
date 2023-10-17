import { JoinBBQInput } from '@/user/app/input/join-bbq.input';
import { UpdateUserInput } from '@/user/app/input/update-user.input';
import { UserService } from '@/user/app/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sync')
  sync(@Body() payload: any, @Headers() headers: any) {
    return this.userService.sync(payload, headers);
  }

  @Post('/join-bbq')
  join(@Body() input: JoinBBQInput) {
    return this.userService.join(input);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserInput) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
