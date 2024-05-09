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
import { GetByIdParamsDto } from '@/core/dto'
import { CreateClubDto, UpdateClubDto, FindAllClubDto } from './dto'

@ApiTags('Клубы')
@ApiBearerAuth('access-auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('club')
export class ClubController {
	constructor(private readonly clubService: ClubService) {}

	@ClubDocSwagger.getAll()
	@Get()
	public getAll(@Query() query: FindAllClubDto) {
		return this.clubService.getAll(query)
	}

	@ClubDocSwagger.getById()
	@Get(':id')
	public getById(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.getById(id)
	}

	@ClubDocSwagger.create()
	@Post()
	public create(@Body() dto: CreateClubDto) {
		return this.clubService.create(dto)
	}

	@ClubDocSwagger.update()
	@Put(':id')
	public update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateClubDto) {
		return this.clubService.update(id, dto)
	}

	@ClubDocSwagger.delete()
	@HttpCode(204)
	@Delete(':id')
	public delete(@Param() { id }: GetByIdParamsDto) {
		return this.clubService.delete(id)
	}
}
