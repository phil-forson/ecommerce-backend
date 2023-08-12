import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductCategoryModule } from 'src/Category/product-category.module';
import { CartModule } from 'src/cart/cart.module';
import { ProductCategoryService } from 'src/Category/product-category.service';
import { CartService } from 'src/cart/cart.service';
import { ProductCategory } from 'src/Category/product-category.entity';
import { Cart } from 'src/cart/cart.entity';
import { OrderLine } from 'src/Orderline/orderline.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, Cart, OrderLine]),
    ProductCategoryModule,
    CartModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductCategoryService, CartService],
})
export class ProductModule {}
