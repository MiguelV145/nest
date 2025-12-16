import { Controller, Get, Param } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { get } from 'http';

@Controller('users')
export class UsersController {

    users: any[]=[];
    currentId: 1;

    @Get()
    findAll(){
        return this.users.map(user=> UserMapper.toResponse(user))

    }
    @Get(':id')
    findOne(@Param('id') id:string){
        const user = this.users.find(u=> u.id === Number(id));
        if(!user){ return {error: 'User not found'};}
        return UserMapper.toResponse (user);

    }


}