import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	Query,
	Put,
	UseInterceptors,
	ClassSerializerInterceptor
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from './dto'
import { RolesAuthGuard } from '@/auth/guards'
import { EStaffRole } from '@/core/enums'
import { GetByIdParamsDto } from '@/core/dto'
import { FindAllProductDto } from './dto/find-all.dto'
import { ProductDocSwagger } from './swagger'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Товары')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@RolesAuthGuard(EStaffRole.DIRECTOR)
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ProductDocSwagger.create()
	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto)
	}

	@ProductDocSwagger.getAll()
	@Get()
	getAll(@Query() query: FindAllProductDto) {
		return this.productService.getAll(query)
	}

	@ProductDocSwagger.getById()
	@Get(':id')
	getById(@Param() { id }: GetByIdParamsDto) {
		return this.productService.getById(id)
	}

	@ProductDocSwagger.update()
	@Put(':id')
	update(@Param() { id }: GetByIdParamsDto, @Body() dto: UpdateProductDto) {
		return this.productService.update(id, dto)
	}

	@ProductDocSwagger.delete()
	@Delete(':id')
	delete(@Param() { id }: GetByIdParamsDto) {
		return this.productService.delete(id)
	}
}
