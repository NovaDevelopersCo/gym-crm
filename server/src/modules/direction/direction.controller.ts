import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { DirectionDocSwagger } from './swagger'
import { DirectionService } from './direction.service'
import { CreateDirectionDto, UpdateDirectionDto, FindAllDirectionDto } from './dto'
import { GetByIdParamsDto } from '@/core/dto'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'

@ApiTags('Направления')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('direction')
export class DirectionController {
	constructor(private readonly directionService: DirectionService) {}

	@DirectionDocSwagger.getAll()
	@Get()
	public async getAll(@Query() query: FindAllDirectionDto) {
		return this.directionService.getAll(query)
	}

	@DirectionDocSwagger.getById()
	@Get(':id')
	public getById(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.getById(id)
	}

	@DirectionDocSwagger.create()
	@Post()
	public create(@Body() dto: CreateDirectionDto) {
		return this.directionService.create(dto)
	}

	@DirectionDocSwagger.update()
	@Put(':id')
	public update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateDirectionDto) {
		return this.directionService.update(id, dto)
	}

	@HttpCode(204)
	@DirectionDocSwagger.delete()
	@Delete(':id')
	public delete(@Param() { id }: GetByIdParamsDto) {
		return this.directionService.delete(id)
	}
}
