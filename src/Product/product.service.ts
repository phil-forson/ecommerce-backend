import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    // Inject the Product repository
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Retrieve all products
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Retrieve a product by ID
  async findOne(id: number): Promise<Product> {
    // Fetch product with associated category using relations
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    return product;
  }

  // Create a new product
  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  // Update a product by ID
  async update(id: number, product: Product): Promise<Product> {
    // Update product data in the database
    await this.productRepository.update(id, product);
    // Retrieve the updated product
    return this.productRepository.findOne({ where: { id } });
  }

  // Remove a product by ID
  async remove(id: number): Promise<void> {
    // Delete product from the database
    await this.productRepository.delete(id);
  }
}
