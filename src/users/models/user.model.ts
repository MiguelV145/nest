import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update.user.dto';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
  ) {

    if (!name || name.trim().length < 3) {
      throw new Error("Nombre inválido");
    }

    if (!email || !email.includes("@")) {
      throw new Error("Email inválido");
    }

    if (!password || password.length < 8) {
      throw new Error("Password inválido");
    }
  }

  // ==================== FACTORY METHODS ====================

  /**
   * Crea un User desde un DTO de creación
   */
  static fromDto(dto: CreateUserDTO): User {
    return new User(
      0, dto.name, dto.email, dto.password, new Date());
  }

  /**
   * Crea un User desde una entidad persistente
   */
  static fromEntity(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.password,
      entity.createdAt,
    );
  }

  // ==================== CONVERSION METHODS ====================

  /**
   * Convierte este User a una entidad persistente
   */
  toEntity(): UserEntity {
    const entity = new UserEntity();
    if (this.id > 0) {
      entity.id = this.id;
    }
    entity.name = this.name;
    entity.email = this.email;
    entity.password = this.password;
    return entity;
  }

  /**
   * Convierte este User a un DTO de respuesta
   */
  toResponseDto(): UserResponseDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
    };
    // NO incluye password
  }

  /**
   * Aplica actualización completa
   */
  update(dto: UpdateUserDto): User {
    this.name = dto.name;
    this.email = dto.email;
    this.password = dto.password;
        
    return this;
  }

  /**
   * Aplica actualización parcial
   */
  partialUpdate(dto: PartialUpdateUserDto): User {
    if (dto.name !== undefined) {
      this.name = dto.name;
    }
    if (dto.email !== undefined) {
      this.email = dto.email;
    }
    if (dto.password !== undefined) {
      this.password = dto.password;
    }
    return this;
  }
}