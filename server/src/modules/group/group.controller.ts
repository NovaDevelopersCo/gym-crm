import { Controller, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Группы')
@UsePipes(new ValidationPipe())
@Controller('group')
export class GroupController {}
