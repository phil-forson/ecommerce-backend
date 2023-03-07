import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
      ) {}
    
      async findAll(): Promise<Order[]> {
        return this.orderRepository.find({
          relations: ['user', 'product'],
        });
      }
    
      async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({
          where: { id },
          relations: ['user', 'product'],
        });
      }
    
      async create(order: Order): Promise<Order> {
        return this.orderRepository.save(order);
      }
    
      async update(id: number, order: Order): Promise<Order> {
        await this.orderRepository.update(id, order);
        return this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'product'],
          });
      }
    
      async remove(id: number): Promise<void> {
        await this.orderRepository.delete(id);
      }
}
