export class Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    createdAt: Date;    
    constructor(id: number, name: string, price: number,stock: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.createdAt = new Date();
    }   
}
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../core/entities/base.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  // TypeORM maps decimal to string in JS, we'll convert in the model
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: string;

  @Column({ type: 'int', default: 0 })
  stock: number;
}
