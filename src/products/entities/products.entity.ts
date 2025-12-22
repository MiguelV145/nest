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