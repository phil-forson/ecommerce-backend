import { Order } from 'src/Order/order.entity';
import { ProductCategory } from 'src/Category/product-category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderLine } from 'src/Orderline/orderline.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;


  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.product)
  orderProducts: OrderLine []
}
