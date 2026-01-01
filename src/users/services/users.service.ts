import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user.model';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PartialUpdateUserDto } from '../dtos/partial-update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return (await this.userRepository.find())
      .map(User.fromEntity)
      .map(user => user.toResponseDto());
  }

  async findOne(id: number) {
    const entity = await this.userRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`User with ID ${id} not found`);

    return User.fromEntity(entity).toResponseDto();
  }

  async create(dto: CreateUserDTO) {
    const user = User.fromDto(dto);
    const saved = await this.userRepository.save(user.toEntity());
    return User.fromEntity(saved).toResponseDto();
  }

  async update(id: number, dto: UpdateUserDto) {
    const entity = await this.userRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`User with ID ${id} not found`);

    const updated = User.fromEntity(entity).update(dto).toEntity();
    const saved = await this.userRepository.save(updated);

    return User.fromEntity(saved).toResponseDto();
  }

  async partialUpdate(id: number, dto: PartialUpdateUserDto) {
    const entity = await this.userRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`User with ID ${id} not found`);

    const updated = User.fromEntity(entity).partialUpdate(dto).toEntity();
    const saved = await this.userRepository.save(updated);

    return User.fromEntity(saved).toResponseDto();
  }

  async delete(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`User with ID ${id} not found`);
  }
}
