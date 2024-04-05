import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { DirectionDocSwagger } from './swagger'
import { DirectionService } from './direction.service'
import { CreateDirectionDto, UpdateDirectionDto } from './dto'
import { GetByIdParamsDto } from '@/core/dto'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'

@ApiTags('Направления')
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('direction')
export class DirectionController {
	constructor(private readonly directionService: DirectionService) {}

	@DirectionDocSwagger.getAll()
	@Get()
	async getAll() {
		return this.directionService.getAll()
	}

	@DirectionDocSwagger.getById()
	@Get(':id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.getById(id)
	}

	@DirectionDocSwagger.create()
	@Post()
	create(@Body() dto: CreateDirectionDto) {
		return this.directionService.create(dto)
	}

	@DirectionDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateDirectionDto) {
		return this.directionService.update(id, dto)
	}

	@HttpCode(204)
	@DirectionDocSwagger.delete()
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.delete(id)
	}
}
