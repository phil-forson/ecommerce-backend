import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartitem } from 'src/Cartitem/cartitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Cartitem])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
