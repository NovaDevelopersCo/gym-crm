import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Res,
	Get,
	UnauthorizedException,
	HttpCode
} from '@nestjs/common'
import { AuthService } from './auth.service'

import { ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { LoginDto } from './dto'

import { ESwaggerMessages, AuthOk, RefreshOk } from '@/core/swagger'

import type { CookieOptions, Response } from 'express'

import { Cookie, Staff } from '@/core/decorators'

import { RefreshGuard } from './guards'

@ApiTags('Авторизация')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private readonly refreshCookieOptions: CookieOptions = {
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60 * 1000,
		path: '/api/auth'
	}

	@ApiOperation({ summary: 'Логин в профиле управляющего' })
	@ApiOkResponse({ description: 'Access токен', type: AuthOk })
	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = await this.authService.login(dto)

		res.cookie('refresh', refreshToken, this.refreshCookieOptions)
		return { accessToken }
	}

	@ApiOperation({ summary: 'Обновление токенов' })
	@ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED })
	@ApiOkResponse({ description: 'Access токен', type: RefreshOk })
	@RefreshGuard()
	@Get('refresh')
	async refresh(
		@Staff('id') user: string,
		@Cookie('refresh') refresh: string,
		@Res({ passthrough: true }) res: Response
	) {
		const data = await this.authService.refresh(refresh, user)

		if (!data) {
			res.clearCookie('refresh', { path: this.refreshCookieOptions.path })
			throw new UnauthorizedException()
		}

		const {
			tokens: { accessToken, refreshToken },
			profile
		} = data

		res.cookie('refresh', refreshToken, this.refreshCookieOptions)

		return { accessToken, profile }
	}

	@HttpCode(200)
	@ApiOperation({ summary: 'Выход из профиля' })
	@ApiOkResponse({ description: 'Успешный выход из профиля', status: 200 })
	@Get('logout')
	async logout(@Cookie('refresh') refresh: string, @Res({ passthrough: true }) res: Response) {
		this.authService.logout(refresh)
		res.clearCookie('refresh', { path: this.refreshCookieOptions.path })
		return
	}
}
