import { UserCreatedPayload } from '@/@shared/gateway/clerk/webhook/user-created/payload.interface';
import { PrismaService } from '@/@shared/prisma/client';
import { JoinBBQInput } from '@/user/app/input/join-bbq.input';
import { UserRepositoryInterface } from '@/user/domain/user-repository.interface';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Barbecue, User } from '@prisma/client';
import { Webhook } from 'svix';

@Injectable()
export class UserPrismaRepository implements UserRepositoryInterface {
  private logger = new Logger(UserPrismaRepository.name);

  constructor(private db: PrismaService) {}

  async joinBBQ(input: JoinBBQInput): Promise<void> {
    const bbq = await this.db.barbecue.findUnique({
      where: { id: input.bbqId },
    });
    const user = await this.find(input.id);

    const userAlreadyInTheBBQ = await this.db.guestBarbecue.findFirst({
      where: {
        userId: input.id,
      },
    });

    if (userAlreadyInTheBBQ) {
      this.logger.error('User alredy joined the bbq. ');
      throw new BadRequestException('USER_ALREADY_IN_THE_BBQ');
    }

    if (!user) {
      this.logger.error('Cant find the specified user. ');
      throw new NotFoundException('USER_NOT_FOUND');
    }

    if (!bbq) {
      this.logger.error('Barbecue not found. ');
      throw new NotFoundException('BARBECUE_NOT_FOUND');
    }

    const isBBQAvailable = await this.isAvailableToJoin(input.bbqId);

    if (!isBBQAvailable) {
      throw new BadRequestException('BARBECUE_NOT_AVAILABLE_TO_JOIN');
    }

    const isContributionValid = await this.isContributionValid(
      bbq.id,
      input.contribution,
    );

    if (!isContributionValid) {
      this.logger.error('Invalid contribution value. ');
      throw new BadRequestException('INVALID_CONTRIBUTION');
    }

    await this.db.guestBarbecue.create({
      data: {
        contribution: input.contribution,
        barbecueId: input.bbqId,
        userId: input.id,
      },
    });
  }

  async find(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    return user;
  }

  async invitedBarbecues(id: string): Promise<Barbecue[]> {
    const user = await this.find(id);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const barbecues = await this.db.barbecue.findMany({
      where: {
        guests: {
          some: {
            userId: id,
          },
        },
      },
    });

    return barbecues;
  }

  async createdBarbecues(id: string) {
    const user = await this.find(id);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const bbqs = await this.db.barbecue.findMany({
      where: {
        userId: id,
      },
    });
    return bbqs;
  }

  async sync(payload: any, headers: any): Promise<void> {
    this.logger.log('Start sync clerk user with database');
    const data = await this.validateClerkWebhook(payload, headers);
    const user = await this.findByExternalId(data.id);

    if (user) {
      throw new NotFoundException('USER_ALREADY_CREATED');
    }

    await this.db.user.create({
      data: {
        id: data.id,
        avatar: data.image_url,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        externalId: data.id,
      },
    });

    this.logger.log('User added succesfully.');
  }

  private async findByExternalId(externalId: string) {
    const user = await this.db.user.findUnique({
      where: {
        externalId,
      },
    });

    return user;
  }

  private async validateClerkWebhook(payload: any, headers: any) {
    const wh = new Webhook(process.env.CLERK_SIGNIN_SECRET);
    const evt = wh.verify(JSON.stringify(payload), headers) as WebhookEvent;
    const { id } = evt.data;
    const eventType = evt.type;
    if (eventType === 'user.created') {
      console.log(`User ${id} was ${eventType}`);
    }

    return evt.data as unknown as UserCreatedPayload['data'];
  }

  private async isAvailableToJoin(bbqId: string): Promise<boolean> {
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

  private async isContributionValid(
    bbqId: string,
    contribution: number,
  ): Promise<boolean> {
    const bbq = await this.db.barbecue.findUnique({ where: { id: bbqId } });
    if (contribution < bbq.minContribution) {
      return false;
    }

    return true;
  }
}
