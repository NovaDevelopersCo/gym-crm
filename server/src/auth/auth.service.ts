import { Injectable } from '@nestjs/common'

import { RegistrationDto } from './dto/registration.dto'
import { LoginDto } from './dto'

@Injectable()
export class AuthService {
	constructor() {}
	registration(dto: RegistrationDto) {
		console.log(dto)
	}

	login(dto: LoginDto) {
		console.log(dto)
	}
}
