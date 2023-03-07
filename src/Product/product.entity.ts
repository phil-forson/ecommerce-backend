import { Order } from 'src/Order/order.entity';
import { ProductCategory } from 'src/Category/product-category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;
}
