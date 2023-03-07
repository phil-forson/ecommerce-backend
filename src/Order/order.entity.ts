import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/Product/product.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @ManyToOne(() => User, user => user.orders)
    user: User

    @ManyToOne(() => Product, product => product.orders)
    product: Product
}