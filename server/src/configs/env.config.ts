import { ConfigModuleOptions } from '@nestjs/config'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { envValidate } from '@core/utils'
import { Type } from 'class-transformer'
import { ENodeEnv } from '@/core/enums'

export class EnvironmentVariables {
	@Type(() => Number)
	@IsInt()
	PORT: number

	@IsString()
	POSTGRES_HOST: string

	@Type(() => Number)
	@IsInt()
	POSTGRES_PORT: number

	@IsString()
	POSTGRES_USER: string

	@IsString()
	POSTGRES_PASSWORD: string

	@IsString()
	POSTGRES_DATABASE: string

	@IsString()
	ACCESS_JWT_SECRET: string

	@IsString()
	REFRESH_JWT_SECRET: string

	@IsOptional()
	@IsEnum(ENodeEnv)
	NODE_ENV: ENodeEnv
}

export const EnvConfigOptions: ConfigModuleOptions = {
	validate: envValidate(EnvironmentVariables),
	isGlobal: true
}
