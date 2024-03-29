import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common'

import { Post } from '@nestjs/common'

import { CreateDto } from './dto'
import { StaffService } from './staff.service'

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('staff')
export class StaffController {
	constructor(private readonly staffService: StaffService) {}
	@Post()
	create(@Body() dto: CreateDto) {
		return this.staffService.create(dto)
	}
}
