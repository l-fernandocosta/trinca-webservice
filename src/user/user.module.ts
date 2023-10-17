import { PrismaService } from '@/@shared/prisma/client';
import { UserService } from '@/user/app/user.service';
import { UserRepositoryInterface } from '@/user/domain/user-repository.interface';
import { UserPrismaRepository } from '@/user/infra/user-prisma.repository';
import { UserController } from '@/user/infra/user.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [
    UserService,

    PrismaService,
    {
      provide: UserRepositoryInterface,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
