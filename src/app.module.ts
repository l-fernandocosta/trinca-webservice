import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BarbecueModule } from './barbecue/infra/barbecue.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), BarbecueModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
