import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { ProductCategory } from 'src/Category/product-category.entity';
import { ProductCategoryService } from 'src/Category/product-category.service';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly cartService: CartService,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }

  @Get(':id/category')
  async findCategory(@Param('id') id: number): Promise<ProductCategory> {
    const product = await this.productService.findOne(id);
    return this.productCategoryService.findOne(product.category.id);
  }

  @Post(':id/cart')
  async addToCart(
    @Param('id') id: number,
    @Body() body: { cartId: number },
  ): Promise<void> {
    const product = await this.productService.findOne(id);
    const cart = await this.cartService.findOne(body.cartId);
    cart.products.push(product);
    await this.cartService.update(body.cartId, cart);
  }
}
