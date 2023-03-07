import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Controller('categories')
export class ProductCategoryController {

    constructor( private readonly productCategoryService: ProductCategoryService){}
    @Get('')
    async findAll(): Promise<ProductCategory []> {
        return this.productCategoryService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ProductCategory> {
      return this.productCategoryService.findOne(id);
    }
  
    @Post()
    async create(@Body() productCategory: ProductCategory): Promise<ProductCategory> {
      return this.productCategoryService.create(productCategory);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() productCategory: ProductCategory,
    ): Promise<ProductCategory> {
      return this.productCategoryService.update(id, productCategory);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
      return this.productCategoryService.remove(id);
    }
}
