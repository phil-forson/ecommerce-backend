import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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

  // Handle HTTP GET request to retrieve all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Handle HTTP GET request to retrieve a product by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Handle HTTP POST request to create a new product
  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  // Handle HTTP PUT request to update a product by ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  // Handle HTTP DELETE request to remove a product by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }

  // Handle HTTP GET request to retrieve the category of a product by product ID
  @Get(':id/category')
  async findCategory(@Param('id') id: number): Promise<any> {
    const product = await this.productService.findOne(id);
    return this.productCategoryService.findOne(product.category.id);
  }

  // Handle HTTP POST request to add a product to a cart
  @Post(':id/cart')
  async addToCart(
    @Param('id') id: number,
    @Body() body: { cartId: number },
  ): Promise<void> {
    const product = await this.productService.findOne(id);
    const cart = await this.cartService.findOne(body.cartId);
    await this.cartService.update(body.cartId, cart);
  }
}
