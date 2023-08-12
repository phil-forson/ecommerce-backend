import { Cart } from 'src/cart/cart.entity';
import { Product } from 'src/Product/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cartitem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
