import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvConfigOptions, getMailerConfig, getTypeormOptions } from '@configs'
import { AuthModule } from './auth/auth.module'
import { StaffModule } from './modules/staff/staff.module'
import { ClubModule } from './modules/club/club.module'
import { DirectionModule } from './modules/direction/direction.module'
import { UserModule } from './modules/user/user.module'
import { AbonementModule } from './modules/abonement/abonement.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupModule } from './modules/group/group.module'
import { DataBaseModule } from './core/database/database.module'
import { NotificationModule } from './notification/notification.module'
import { MailerModule } from '@nestjs-modules/mailer'

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
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeormOptions
		}),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailerConfig
		}),
		NotificationModule
	]
})
export class AppModule {}
