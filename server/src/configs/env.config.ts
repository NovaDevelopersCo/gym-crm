import { ConfigModuleOptions } from '@nestjs/config'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { envValidate } from '@core/utils'
import { Type } from 'class-transformer'
import { ENodeEnv } from '@/core/enums'

export class EnvironmentVariables {
	@Type(() => Number)
	@IsInt()
	private readonly PORT: number

	@IsString()
	private readonly POSTGRES_HOST: string

	@Type(() => Number)
	@IsInt()
	private readonly POSTGRES_PORT: number

	@IsString()
	private readonly POSTGRES_USER: string

	@IsString()
	private readonly POSTGRES_PASSWORD: string

	@IsString()
	private readonly POSTGRES_DATABASE: string

	@IsString()
	private readonly ACCESS_JWT_SECRET: string

	@IsString()
	private readonly REFRESH_JWT_SECRET: string

	@IsOptional()
	@IsEnum(ENodeEnv)
	private readonly NODE_ENV: ENodeEnv
}

export const EnvConfigOptions: ConfigModuleOptions = {
	validate: envValidate(EnvironmentVariables),
	isGlobal: true
}
