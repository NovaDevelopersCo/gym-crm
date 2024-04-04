import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvConfigOptions, getTypeormOptions } from '@configs'
import { AuthModule } from './auth/auth.module'
import { StaffModule } from './modules/staff/staff.module'
import { ClubModule } from './modules/club/club.module'
import { DirectionModule } from './modules/direction/direction.module'
import { UserModule } from './modules/user/user.module'
import { AbonementModule } from './modules/abonement/abonement.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupModule } from './modules/group/group.module'

// -- проверка при создании клуба, что админ не занят
// -- сделать дто для связанных моделей при запросе
// -- поубирать везде преобразование типов у id
// -- добавить сериализацию к возвращаемым данным
// -- вынести декораторы сваггера

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
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeormOptions
		})
	]
})
export class AppModule {}
