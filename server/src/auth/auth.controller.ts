import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'

import { CookieOptions, Response } from 'express'

import { Cookie } from '@/core/decorators'

import { LoginDto, RegistrationDto } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private readonly refreshCookieOptions: CookieOptions = {
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60 * 1000,
		path: '/api/auth'
	}

	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: LoginDto, @Res() res: Response) {
		const { accessToken, refreshToken } = await this.authService.login(dto)

		res.cookie('refresh', refreshToken, this.refreshCookieOptions)
		return { accessToken }
	}

	@UsePipes(new ValidationPipe())
	@Post('registration')
	registration(@Body() dto: RegistrationDto) {
		return this.registration(dto)
	}

	@UsePipes(new ValidationPipe())
	@Post('refresh')
	async refresh(@Cookie('refresh') refresh: string | null, @Res() res: Response) {
		if (!refresh) {
			throw new UnauthorizedException()
		}

		const { accessToken, refreshToken } = await this.authService.refresh({ refresh })

		res.cookie('refresh', refreshToken, this.refreshCookieOptions)

		return { accessToken }
	}
}
