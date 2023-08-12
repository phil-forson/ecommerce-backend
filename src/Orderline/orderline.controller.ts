import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrderLine } from './orderline.entity';
import { OrderlineService } from './orderline.service';

@Controller('orderlines')
export class OrderlineController {
  constructor(private orderLineService: OrderlineService) {}

  // Handle HTTP GET request to retrieve all order lines
  @Get()
  findAll(): Promise<OrderLine[]> {
    return this.orderLineService.findAll();
  }

  // Handle HTTP GET request to retrieve an order line by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrderLine> {
    return this.orderLineService.findOne(+id);
  }

  // Handle HTTP POST request to create a new order line
  @Post()
  create(@Body() orderLine: OrderLine): Promise<OrderLine> {
    return this.orderLineService.create(orderLine);
  }

  // Handle HTTP PUT request to update an order line by ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() orderLine: OrderLine,
  ): Promise<OrderLine> {
    return this.orderLineService.update(+id, orderLine);
  }

  // Handle HTTP DELETE request to delete an order line by ID
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.orderLineService.remove(+id);
  }
}
