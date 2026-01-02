import { ApplicationException } from '../base/application.exception';
import { HttpStatus } from '@nestjs/common';
export class NotFoundException extends ApplicationException{
    constructor (message: string ){
        super(message, HttpStatus.NOT_FOUND,);
    }
}