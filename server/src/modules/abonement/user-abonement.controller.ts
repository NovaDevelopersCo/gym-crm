import { UserAbonementService } from './user-abonement.service'
import { AbonementDocSwagger } from './swagger'
import {
	Post,
	Body,
	Controller,
	Get,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
	UsePipes,
	ValidationPipe,
	Query
} from '@nestjs/common'
import { CreateUserAbonementDto, FindAllUserAbonementDto } from './dto'
import { GetByIdParamsDto } from '@/core/dto'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'

@ApiTags('Абонементы')
@ApiBearerAuth('access-auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('abonement/user')
export class UserAbonementController {
	constructor(private readonly userAbonementService: UserAbonementService) {}

	@AbonementDocSwagger.createUserAbonement()
	@Post()
	public create(@Body() dto: CreateUserAbonementDto) {
		return this.userAbonementService.create(dto)
	}

	@AbonementDocSwagger.getAllUserAbonement()
	@Get()
	public getAll(@Query() query: FindAllUserAbonementDto) {
		return this.userAbonementService.getAll(query)
	}

	@AbonementDocSwagger.getByIdUserAbonement()
	@Get(':id')
	public getById(@Param() { id }: GetByIdParamsDto) {
		return this.userAbonementService.getById(id)
	}

	@AbonementDocSwagger.deleteUserAbonement()
	@Delete(':id')
	public delete(@Param() { id }: GetByIdParamsDto) {
		return this.userAbonementService.delete(id)
	}
}
