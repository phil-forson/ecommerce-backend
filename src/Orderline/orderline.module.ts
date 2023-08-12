import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderlineController } from './orderline.controller';
import { OrderLine } from './orderline.entity';
import { OrderlineService } from './orderline.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLine])],
  controllers: [OrderlineController],
  providers: [OrderlineService]
})
export class OrderlineModule {}
