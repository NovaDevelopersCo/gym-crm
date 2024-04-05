import { Controller, UsePipes, ValidationPipe } from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'

@ApiTags('Направления')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('direction')
export class DirectionController {}
