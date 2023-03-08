import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/user.entity';
import { Product } from './Product/product.entity';
import { Order } from './Order/order.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { ProductCategoryModule } from './Category/product-category.module';
import { ProductCategory } from './Category/product-category.entity';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    OrderModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Product, Order, ProductCategory, Cart],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductCategoryModule,
    CartModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
