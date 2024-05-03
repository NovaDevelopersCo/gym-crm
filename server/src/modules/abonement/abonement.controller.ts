import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'
import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
	UseInterceptors,
	ClassSerializerInterceptor,
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
import { CreateAbonementDto, UpdateAbonementDto } from './dto'
import { FindAllAbonementDto } from './dto/find-all.dto'
import { UserAbonementService } from './user-abonement.service'

@ApiTags('Абонементы')
@ApiBearerAuth('access-auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('abonement')
export class AbonementController {
	constructor(
		private readonly abonementService: AbonementService,
		private readonly userAbonementService: UserAbonementService
	) {}

	@AbonementDocSwagger.create()
	@Post()
	create(@Body() dto: CreateAbonementDto) {
		return this.abonementService.create(dto)
	}

	@AbonementDocSwagger.getAll()
	@Get()
	getAll(@Query() query: FindAllAbonementDto) {
		return this.abonementService.getAll(query)
	}

	@AbonementDocSwagger.getById()
	@Get(':id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.abonementService.getById(id)
	}

	@AbonementDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateAbonementDto) {
		return this.abonementService.update(id, dto)
	}

	@AbonementDocSwagger.delete()
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.abonementService.delete(id)
	}
}
