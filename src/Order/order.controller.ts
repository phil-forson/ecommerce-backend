import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Retrieve all orders
  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Retrieve an order by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  // Create a new order
  @Post()
  async create(@Body() order: Order): Promise<Order> {
    return this.orderService.create(order);
  }

  // Update an order by ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() order: Order,
  ): Promise<Order> {
    return this.orderService.update(id, order);
  }

  // Remove an order by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }
}
