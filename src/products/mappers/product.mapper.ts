// Mapper kept for backward compatibility; prefer using Product model.
import { ProductEntity } from "../entities/products.entity";
import { Product } from "../models/product.model";

export class ProductMapper {
    static toEntity(id: number, dto: any): ProductEntity {
        const p = Product.fromDto(dto);
        const e = p.toEntity();
        if (id > 0) e.id = id;
        return e;
    }

    static toResponse(entity: ProductEntity) {
        return Product.fromEntity(entity).toResponseDto();
    }
}
    