import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLine } from './orderline.entity';

@Injectable()
export class OrderlineService {
  constructor(
    // Inject the OrderLine repository
    @InjectRepository(OrderLine)
    private readonly orderRepository: Repository<OrderLine>,
  ) {}

  // Retrieve all order lines
  async findAll(): Promise<OrderLine[]> {
    return this.orderRepository.find();
  }

  // Retrieve an order line by ID
  async findOne(id: number): Promise<OrderLine> {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  // Create a new order line
  async create(orderline: OrderLine): Promise<OrderLine> {
    return this.orderRepository.save(orderline);
  }

  // Update an order line by ID
  async update(id: number, orderline: OrderLine): Promise<OrderLine> {
    // Update order line data in the database
    await this.orderRepository.update(id, orderline);
    // Retrieve the updated order line
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  // Remove an order line by ID
  async remove(id: number): Promise<void> {
    // Delete order line from the database
    await this.orderRepository.delete(id);
  }
}
