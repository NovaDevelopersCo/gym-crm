import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
	Param,
	Body,
	Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AbonementService } from './abonement.service'
import { AbonementDocSwagger } from './swagger'
import { GetByIdParamsDto } from '@/core/dto'
import {
	CreateAbonementDto,
	UpdateAbonementDto,
	FindAllAbonementDto,
	AbonementCheckFields
} from './dto'
import { EStaffRole } from '@/core/enums'
import { RolesAuthGuard } from '@/auth/guards'

@ApiTags('Абонементы')
@ApiBearerAuth('access-auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('abonement')
export class AbonementController {
	constructor(private readonly abonementService: AbonementService) {}

	@AbonementDocSwagger.create()
	@Post()
	public create(@Body() dto: CreateAbonementDto) {
		new AbonementCheckFields(dto)
		return this.abonementService.create(dto)
	}

	@AbonementDocSwagger.getAll()
	@Get()
	public getAll(@Query() query: FindAllAbonementDto) {
		return this.abonementService.getAll(query)
	}

	@AbonementDocSwagger.getById()
	@Get(':id')
	public getById(@Param() { id }: GetByIdParamsDto) {
		return this.abonementService.getById(id)
	}

	@AbonementDocSwagger.update()
	@Put(':id')
	public update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateAbonementDto) {
		new AbonementCheckFields(dto)
		return this.abonementService.update(id, dto)
	}

	@AbonementDocSwagger.delete()
	@Delete(':id')
	public delete(@Param() { id }: GetByIdParamsDto) {
		return this.abonementService.delete(id)
	}
}
