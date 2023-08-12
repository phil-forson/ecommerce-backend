import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartitem } from './cartitem.entity';

@Injectable()
export class CartitemService {
    constructor(
        @InjectRepository(Cartitem)
        private cartItemRepository: Repository<Cartitem>
    ) {}

    // Retrieve all cart items
    async findAll(): Promise<Cartitem[]> {
        return this.cartItemRepository.find();
    }

    // Retrieve a cart item by ID
    async findOne(id: number): Promise<Cartitem> {
        return this.cartItemRepository.findOne({
            where: { id }
        });
    }

    // Create a new cart item
    async create(cartItem: Cartitem): Promise<Cartitem> {
        return this.cartItemRepository.save(cartItem);
    }

    // Update a cart item by ID
    async update(id: number, cartItem: Cartitem): Promise<Cartitem> {
        await this.cartItemRepository.update(id, cartItem);
        return this.cartItemRepository.findOne({
            where: { id }
        });
    }

    // Remove a cart item by ID
    async remove(id: number): Promise<void> {
        await this.cartItemRepository.delete(id);
    }
}
