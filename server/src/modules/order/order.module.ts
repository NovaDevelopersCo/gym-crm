import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity, OrderItemEntity } from './entities'
import { ProductModule } from '../product/product.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]), ProductModule, UserModule],
	controllers: [OrderController],
	providers: [OrderService]
})
export class OrderModule {}
