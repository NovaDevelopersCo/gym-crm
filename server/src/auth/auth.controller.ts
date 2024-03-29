import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Res,
	Get,
	UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'

import type { CookieOptions, Response } from 'express'

import { Cookie, Staff } from '@/core/decorators'

import { LoginDto } from './dto'
import { RefreshGuard } from './guards'

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private readonly refreshCookieOptions: CookieOptions = {
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60 * 1000,
		path: '/api/auth'
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = await this.authService.login(dto)

		res.cookie('refresh', refreshToken, this.refreshCookieOptions)
		return { accessToken }
	}

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

	@Get('logout')
	async logout(@Cookie('refresh') refresh: string, @Res({ passthrough: true }) res: Response) {
		this.authService.logout(refresh)
		res.clearCookie('refresh', { path: this.refreshCookieOptions.path })
		return
	}
}
