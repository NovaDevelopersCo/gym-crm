import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvConfigOptions, getCloudinaryConfig, getTypeormOptions } from '@configs'
import { AuthModule } from '@auth/auth.module'
import { StaffModule } from '@modules/staff/staff.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CloudinaryModule } from '@core/cloudinary/cloudinary.module'
import { FileModule } from '@core/file/file.module'

@Module({
	imports: [
		ConfigModule.forRoot(EnvConfigOptions),
		AuthModule,
		StaffModule,
		FileModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeormOptions
		}),
		CloudinaryModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getCloudinaryConfig
		})
	]
})
export class AppModule {}
