import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfigOptions } from '@/configs'
import { AuthModule } from '@/auth/auth.module'
import { StaffModule } from '@/modules/staff/staff.module'
import { ClubModule } from '@/modules/club/club.module'
import { DirectionModule } from '@/modules/direction/direction.module'
import { UserModule } from '@/modules/user/user.module'
import { AbonementModule } from '@/modules/abonement/abonement.module'
import { GroupModule } from '@/modules/group/group.module'
import { DataBaseModule } from '@/core/database/database.module'
import { LoggerModule } from '@/core/logger/logger.module'
import { ProductModule } from '@/modules/product/product.module'
import { OrderModule } from '@/modules/order/order.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from '@/core/exceptions'
import { OnlineModule } from '@/ws/online/online.module'

@Module({
	imports: [
		ConfigModule.forRoot(EnvConfigOptions),
		AuthModule,
		StaffModule,
		ClubModule,
		DirectionModule,
		UserModule,
		GroupModule,
		AbonementModule,
		DataBaseModule,
		LoggerModule,
		ProductModule,
		OrderModule,
		LoggerModule,
		OnlineModule
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		}
	]
})
export class AppModule {}
