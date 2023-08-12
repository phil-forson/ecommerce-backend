import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  // Retrieve all product categories
  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find();
  }

  // Retrieve a product category by ID
  async findOne(id: number): Promise<ProductCategory> {
    return this.productCategoryRepository.findOne({ where: { id } });
  }

  // Create a new product category
  async create(productCategory: ProductCategory): Promise<ProductCategory> {
    return this.productCategoryRepository.save(productCategory);
  }

  // Update a product category by ID
  async update(id: number, productCategory: ProductCategory): Promise<ProductCategory> {
    const updatedProductCategory = await this.productCategoryRepository.findOne({ where: { id } });
    updatedProductCategory.name = productCategory.name;
    updatedProductCategory.description = productCategory.description;
    return this.productCategoryRepository.save(updatedProductCategory);
  }

  // Remove a product category by ID
  async remove(id: number): Promise<void> {
    await this.productCategoryRepository.delete(id);
  }
}
