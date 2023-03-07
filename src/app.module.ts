import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'
import { User } from './user/user.entity';
import { Product } from './Product/product.entity';
import { Order } from './Order/order.entity';
import { ProductCategoryModule } from './product-category/product-category.module';

dotenv.config()

@Module({
  imports: [UserModule, OrderModule, ProductModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Product, Order],
    synchronize: true

  }),
  ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
