import { IsNumber, IsOptional, IsPositive, MaxLength, Min, MinLength } from "class-validator";

export class PartialUpdateProductsDto {

  @IsOptional()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  name?: string;

  @IsOptional()
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número válido' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock?: number;
}