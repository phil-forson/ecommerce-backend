import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/Product/product.entity';
import { OrderLine } from 'src/Orderline/orderline.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders , { nullable: false })
  user: User;

  @OneToMany(() => OrderLine, (orderProduct) => orderProduct.order, { cascade: true })
  orderProducts: OrderLine[];


}
