import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDTO } from './create.users.dto';

export class UpdateUserDto extends PartialType(CreateUsersDTO) {}