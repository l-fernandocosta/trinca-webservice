import { PrismaService } from '@/@shared/prisma/client';
import { BarbecueService } from '@/barbecue/app/barbecue.service';
import { BarbecueRepository } from '@/barbecue/domain/barbecue-repository';
import { Module } from '@nestjs/common';
import { BarbecuePrismaRepository } from './barbecue-prisma-repository';
import { BarbecueController } from './barbecue.controller';

@Module({
  controllers: [BarbecueController],
  providers: [
    BarbecueService,
    PrismaService,
    {
      provide: BarbecueRepository,
      useClass: BarbecuePrismaRepository,
    },
  ],
})
export class BarbecueModule {}
