import { RolesAuthGuard } from '@/auth/guards'
import {
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
	Body,
	Delete,
	Put,
	HttpCode,
	UseInterceptors,
	ClassSerializerInterceptor,
	Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ClubService } from './club.service'
import { EStaffRole } from '@/core/enums'
import { ClubDocSwagger } from './swagger'
import { GetByIdParamsDto, PaginationQueryDto } from '@/core/dto'
import { CreateClubDto, UpdateClubDto } from './dto'

@ApiTags('Клубы')
@ApiBearerAuth('access-auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('club')
export class ClubController {
	constructor(private readonly clubService: ClubService) {}

	@ClubDocSwagger.getAll()
	@Get()
	getAll(@Query() query: PaginationQueryDto) {
		return this.clubService.getAll(query)
	}

	@ClubDocSwagger.getById()
	@Get(':id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.getById(id)
	}

	@ClubDocSwagger.create()
	@Post()
	create(@Body() dto: CreateClubDto) {
		return this.clubService.create(dto)
	}

	@ClubDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateClubDto) {
		return this.clubService.update(id, dto)
	}

	@ClubDocSwagger.delete()
	@HttpCode(204)
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.delete(id)
	}
}
