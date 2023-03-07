import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cart> {
    return this.cartService.findOne(id);
  }

  @Post()
  async create(@Body() cart: Cart): Promise<Cart> {
    return this.cartService.create(cart);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() cart: Cart): Promise<Cart> {
    return this.cartService.update(id, cart);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.cartService.remove(id);
  }
}
