import { ConfigModuleOptions } from '@nestjs/config'
import { IsNumber, IsString } from 'class-validator'
import { envValidate } from '@core/utils'

export class EnvironmentVariables {
	@IsNumber()
	PORT: number

	@IsString()
	DATABASE_URL: string
}

export const EnvConfigOptions: ConfigModuleOptions = {
	validate: envValidate(EnvironmentVariables),
	isGlobal: true
}
