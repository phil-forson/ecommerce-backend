import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
