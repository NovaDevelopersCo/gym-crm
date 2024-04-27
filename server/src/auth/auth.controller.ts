import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Res,
	Get,
	UnauthorizedException,
	HttpCode,
	UseInterceptors,
	ClassSerializerInterceptor
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDocSwagger } from './swagger'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto'
import type { CookieOptions, Response } from 'express'
import { Cookie, Staff } from '@/core/decorators'
import { RefreshGuard } from './guards'

@ApiTags('Авторизация')
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private readonly refreshCookieOptions: CookieOptions = {
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60 * 1000,
		path: '/api/auth'
	}

	@AuthDocSwagger.login()
	@HttpCode(204)
	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken } = await this.authService.login(dto)
		res.cookie('refresh', refreshToken, this.refreshCookieOptions)
		return
	}

	@AuthDocSwagger.refresh()
	@RefreshGuard()
	@Get('refresh')
	async refresh(
		@Staff('id') user: number,
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

	@AuthDocSwagger.logout()
	@HttpCode(200)
	@Get('logout')
	async logout(@Cookie('refresh') refresh: string, @Res({ passthrough: true }) res: Response) {
		this.authService.logout(refresh)
		res.clearCookie('refresh', { path: this.refreshCookieOptions.path })
		return
	}
}
