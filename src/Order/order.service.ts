import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    // Inject the Order repository
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Retrieve all orders with user and orderProducts relations
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'orderProducts'],
    });
  }

  // Retrieve an order by ID with user and orderProducts relations
  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderProducts'],
    });
  }

  // Create a new order
  async create(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  // Update an order by ID
  async update(id: number, order: Order): Promise<Order> {
    // Update order data in the database
    await this.orderRepository.update(id, order);
    // Retrieve the updated order with user and orderProducts relations
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderProducts'],
    });
  }

  // Remove an order by ID
  async remove(id: number): Promise<void> {
    // Delete order from the database
    await this.orderRepository.delete(id);
  }
}
