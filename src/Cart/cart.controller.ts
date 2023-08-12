import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Retrieve all carts with related user and items
  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  // Retrieve a cart by ID with related user and items
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cart> {
    return this.cartService.findOne(id);
  }

  // Create a new cart and retrieve it with related user and items
  @Post()
  async create(@Body() cart: Cart): Promise<Cart> {
    return this.cartService.create(cart);
  }

  // Update a cart by ID and retrieve it with related user and items
  @Put(':id')
  async update(@Param('id') id: number, @Body() cart: Cart): Promise<Cart> {
    return this.cartService.update(id, cart);
  }

  // Remove a cart by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.cartService.remove(id);
  }
}
