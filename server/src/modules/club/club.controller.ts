import { Controller, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Клубы')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('club')
export class ClubController {}
