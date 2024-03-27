import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'

import { LoginDto, RegistrationDto } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@Post('registration')
	registration(@Body() dto: RegistrationDto) {
		return this.registration(dto)
	}
}
