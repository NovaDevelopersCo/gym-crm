import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseInterceptors,
	ClassSerializerInterceptor,
	Query
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create.dto'
import { GetByIdParamsDto } from '@/core/dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'
import { FindAllOrderDto } from './dto/find-all.dto'
import { OrderDocSwagger } from './swagger'

@ApiTags('Заказы')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@OrderDocSwagger.create()
	@Post()
	create(@Body() dto: CreateOrderDto) {
		return this.orderService.create(dto)
	}

	@OrderDocSwagger.getAll()
	@Get()
	getAll(@Query() query: FindAllOrderDto) {
		return this.orderService.getAll(query)
	}

	@OrderDocSwagger.getById()
	@Get(':id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.orderService.getById(id)
	}

	@OrderDocSwagger.delete()
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.orderService.delete(id)
	}
}
