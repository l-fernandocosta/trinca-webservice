import { PrismaService } from '@/@shared/prisma/client';
import { CreateBarbecueInput } from '@/barbecue/app/input/create-barbecue.input';
import { FindManyQueryParamsInput } from '@/barbecue/app/input/find-many-query-params.input';
import { UpdateBarbecueInput } from '@/barbecue/app/input/update-barbecue.input';
import { BarbecueRepository } from '@/barbecue/domain/barbecue-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Barbecue } from '@prisma/client';

@Injectable()
export class BarbecuePrismaRepository implements BarbecueRepository {
  constructor(private db: PrismaService) {}

  async findBarbecuesByGuest(id: string): Promise<Barbecue[]> {
    const bbqGuest = await this.db.barbecue.findMany({
      where: {
        guests: {
          some: {
            userId: id,
          },
        },
      },
    });
    return bbqGuest;
  }

  async findMany(input: FindManyQueryParamsInput): Promise<Barbecue[]> {
    const bbqs = await this.db.barbecue.findMany({
      include: {
        createdBy: true,
        guests: true,
      },
      where: {
        date: {
          gte: input.from,
          lte: input.to,
        },
        AND: {
          userId: {
            not: input.userid,
          },
        },
      },
    });
    return bbqs;
  }

  async find(id: string): Promise<Barbecue> {
    const barbecue = await this.db.barbecue.findUnique({
      where: {
        id,
      },
      include: {
        guests: {
          include: {
            user: true,
            barbecue: true,
          },
        },
        createdBy: true,
      },
    });
    return barbecue;
  }

  async findByUser(id: string): Promise<Barbecue[]> {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const bbqs = await this.db.barbecue.findMany({
      where: {
        userId: id,
      },
    });

    return bbqs;
  }

  async create(input: CreateBarbecueInput): Promise<void> {
    const user = await this.db.user.findUnique({
      where: {
        id: input.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    await this.db.barbecue.create({
      data: {
        ...input,
      },
    });
  }

  async update(input: UpdateBarbecueInput, bbqId: string): Promise<void> {
    const bbq = await this.db.barbecue.findUnique({
      where: {
        id: bbqId,
      },
    });

    if (!bbq) {
      throw new NotFoundException('BARBECUE_NOT_FOUND');
    }

    await this.db.barbecue.update({
      where: {
        id: bbq.id,
      },
      data: {
        ...input,
      },
    });
  }

  async isAvailableToJoin(bbqId: string): Promise<boolean> {
    const bbq = await this.db.barbecue.findUnique({
      where: {
        id: bbqId,
      },
      include: {
        guests: true,
      },
    });

    if (bbq.guests.length == bbq.maxCapacity) {
      return false;
    }

    return true;
  }

  async isContributionValid(
    bbqId: string,
    contribution: number,
  ): Promise<boolean> {
    const bbq = await this.find(bbqId);
    if (contribution < bbq.minContribution) {
      return false;
    }

    return true;
  }
}
