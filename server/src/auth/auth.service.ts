import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'

import { LoginDto, RegistrationDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'

import { StaffEntity } from './entities'
import { Repository } from 'typeorm'

import bcrypt from 'bcrypt'
import { TokenService } from './token.service'

import { StaffService } from '@/modules/staff/staff.service'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(StaffEntity) private readonly staffRepository: Repository<StaffEntity>,
		private readonly tokenService: TokenService,
		private readonly staffService: StaffService
	) {}
	async registration(dto: RegistrationDto) {
		console.log(dto)
	}

	async login({ email, password }: LoginDto) {
		const candidate = await this.staffRepository.findOne({ where: { email } })

		if (!candidate) {
			throw new BadRequestException('Профиль не найден')
		}

		const isPasswordValid = bcrypt.compare(password, candidate.password)

		if (!isPasswordValid) {
			throw new BadRequestException('Неверный пароль')
		}

		const tokens = this.tokenService.generateTokens(candidate)

		return tokens
	}

	async refresh({ refresh }: { refresh: string }) {
		const tokenFromDb = await this.tokenService.findToken({ token: refresh })
		const validate = await this.tokenService.validateRefreshToken({ refresh })

		if (!tokenFromDb || !validate.id) {
			throw new UnauthorizedException()
		}

		const user = await this.staffService.getById({ id: +validate.id })

		if (!user) {
			throw new UnauthorizedException()
		}

		const tokens = this.tokenService.generateTokens(user)

		await this.tokenService.saveTokenToDb({ token: tokens.refreshToken, user: user.id })

		return tokens
	}
}
