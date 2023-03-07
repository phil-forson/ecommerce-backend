import { Product } from 'src/Product/product.entity'
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => Product, product => product.productCategory)
    products: Product []
}