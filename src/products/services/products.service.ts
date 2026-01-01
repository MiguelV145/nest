import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';3
import { Product } from '../models/product.model';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { PartialUpdateProductsDto } from '../dtos/partial-update-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { CreateProductDto } from '../dtos/create-porduct.dto';
import { ProductEntity } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductResponseDto[]> {
    return (await this.repo.find({ where: { deleted: false } }))
      .map(Product.fromEntity)
      .map(p => p.toResponseDto());
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const entity = await this.repo.findOne({ where: { id, deleted: false } });
    if (!entity) throw new NotFoundException(`Product with ID ${id} not found`);
    return Product.fromEntity(entity).toResponseDto();
  }

  async create(dto: CreateProductDto): Promise<ProductResponseDto> {
    const saved = await this.repo.save(Product.fromDto(dto).toEntity());
    return Product.fromEntity(saved).toResponseDto();
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const entity = await this.repo.findOne({ where: { id, deleted: false } });
    if (!entity) throw new NotFoundException(`Product with ID ${id} not found`);

    const saved = await this.repo.save(
      Product.fromEntity(entity).update(dto).toEntity(),
    );

    return Product.fromEntity(saved).toResponseDto();
  }

  async partialUpdate(id: number, dto: PartialUpdateProductsDto): Promise<ProductResponseDto> {
    const entity = await this.repo.findOne({ where: { id, deleted: false } });
    if (!entity) throw new NotFoundException(`Product with ID ${id} not found`);

    const saved = await this.repo.save(
      Product.fromEntity(entity).partialUpdate(dto).toEntity(),
    );

    return Product.fromEntity(saved).toResponseDto();
  }

  async delete(id: number): Promise<void> {
    const entity = await this.repo.findOne({ where: { id, deleted: false } });
    if (!entity) throw new NotFoundException(`Product with ID ${id} not found`);

    entity.deleted = true;
    await this.repo.save(entity);
  }
}
