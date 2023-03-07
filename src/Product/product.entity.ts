import { Order } from 'src/Order/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number;

    @OneToMany(() => Order, order => order.product)
    orders: Order[]
}