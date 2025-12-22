import { Product } from "../entities/products.entity";

export class ProductMapper {
    static toEntity(id: number, dto: any) {
        return new Product(id, dto.name, dto.price, dto.stock);
    }

    static toResponse(entity: Product) {
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price.toFixed(2),
            stock: entity.stock,
        };
    }
}
    