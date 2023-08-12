import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Product } from 'src/Product/product.entity';
import { Cartitem } from 'src/Cartitem/cartitem.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => Cartitem, (item) => item.cart, { cascade: true })
  items: Cartitem[];

}
