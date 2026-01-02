import { User } from "../entities/user.entity"
import { CreateUserDTO } from "../dtos/create-user.dto";

export class UserMapper {
    static toEntity(dto: CreateUserDTO) {
        return new User(0, dto.name, dto.email, dto.password)
    }

    static toResponse(entity: User) {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            createdAt: entity.createdAt.toISOString(),
        };
    }

}