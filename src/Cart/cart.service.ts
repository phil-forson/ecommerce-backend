import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async create(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }

  async update(id: number, cart: Cart): Promise<Cart> {
    const updatedCart = await this.cartRepository.findOne({ where: { id } });
    updatedCart.products = cart.products;
    return this.cartRepository.save(updatedCart);
  }

  async remove(id: number): Promise<void> {
    await this.cartRepository.delete(id);
  }
}
