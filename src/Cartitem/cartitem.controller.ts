import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Cartitem } from './cartitem.entity';
import { CartitemService } from './cartitem.service';

@Controller('cartitem')
export class CartitemController {
  constructor(private readonly cartItemService: CartitemService) {}

  // Retrieve all cart items
  @Get()
  findAll(): Promise<Cartitem[]> {
    return this.cartItemService.findAll();
  }

  // Retrieve a cart item by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cartitem> {
    return this.cartItemService.findOne(+id);
  }

  // Create a new cart item
  @Post()
  create(@Body() cartItem: Cartitem): Promise<Cartitem> {
    return this.cartItemService.create(cartItem);
  }

  // Update a cart item by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() cartItem: Cartitem): Promise<Cartitem> {
    return this.cartItemService.update(+id, cartItem);
  }

  // Remove a cart item by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cartItemService.remove(+id);
  }
}
