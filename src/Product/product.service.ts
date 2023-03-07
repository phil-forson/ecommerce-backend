import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
    
      async findAll(): Promise<Product[]> {
        return this.productRepository.find();
      }
    
      async findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({where: {id}});
      }
    
      async create(product: Product): Promise<Product> {
        return this.productRepository.save(product);
      }
    
      async update(id: number, product: Product): Promise<Product> {
        await this.productRepository.update(id, product);
        return this.productRepository.findOne({where: {id}});
      }
    
      async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
      }
}
