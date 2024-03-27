import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/database/prisma.service'
import { RegistrationDto } from './dto/registration.dto'
import { LoginDto } from './dto'

@Injectable()
export class AuthService {
	constructor(private readonly prismaService: PrismaService) {}
	registration(data: RegistrationDto) {
		console.log(data)
	}

	login(data: LoginDto) {
		console.log(data)
	}
}
