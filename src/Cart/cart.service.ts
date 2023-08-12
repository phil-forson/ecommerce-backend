import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  // Retrieve all carts with related user and items
  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['user', 'items'] });
  }

  // Retrieve a cart by ID with related user and items
  async findOne(id: number): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { id },
      relations: ['user', 'items'],
    });
  }

  // Create a new cart and retrieve it with related user and items
  async create(cart: Cart): Promise<Cart> {
    const addedCart = await this.cartRepository.save(cart);
    return this.cartRepository.findOne({
      where: { id: addedCart.id },
      relations: ['user', 'items'],
    });
  }

  // Update a cart by ID and retrieve it with related user and items
  async update(id: number, cart: Partial<Cart>): Promise<Cart> {
    await this.cartRepository.update(id, cart);
    return this.cartRepository.findOne({
      where: { id },
      relations: ['user', 'items'],
    });
  }

  // Remove a cart by ID
  async remove(id: number): Promise<void> {
    await this.cartRepository.delete(id);
  }
}
