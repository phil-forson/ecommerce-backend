import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Controller('categories')
export class ProductCategoryController {

    constructor(private readonly productCategoryService: ProductCategoryService) {}

    // Retrieve all product categories
    @Get()
    async findAll(): Promise<ProductCategory[]> {
        return this.productCategoryService.findAll();
    }

    // Retrieve a product category by ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ProductCategory> {
        return this.productCategoryService.findOne(id);
    }

    // Create a new product category
    @Post()
    async create(@Body() productCategory: ProductCategory): Promise<ProductCategory> {
        return this.productCategoryService.create(productCategory);
    }

    // Update a product category by ID
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() productCategory: ProductCategory,
    ): Promise<ProductCategory> {
        return this.productCategoryService.update(id, productCategory);
    }

    // Remove a product category by ID
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.productCategoryService.remove(id);
    }
}
