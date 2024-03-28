import { Injectable } from '@nestjs/common'

import { StaffEntity } from './entities'

import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ValidateRefreshDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { SessionEntity } from './entities'

import { Repository } from 'typeorm'

@Injectable()
export class TokenService {
	constructor(
		@InjectRepository(SessionEntity)
		private readonly sessionRepository: Repository<SessionEntity>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	generateTokens({ email, id, role }: StaffEntity) {
		const payload = { email, id, role }

		const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.get('ACCESS_JWT_SECRET'),
			expiresIn: '30m'
		})

		const refreshToken = this.jwtService.sign(payload, {
			secret: this.configService.get('REFRESH_JWT_SECRET'),
			expiresIn: '30d'
		})

		return { accessToken, refreshToken }
	}

	async saveTokenToDb({ token, user }: { token: string; user: number }) {
		const candidate = await this.sessionRepository.findOne({ where: { token } })
		if (candidate) {
			return this.sessionRepository.save({
				...candidate,
				token
			})
		}
		return this.sessionRepository.create({ token, user })
	}

	async validateRefreshToken({ refresh }: ValidateRefreshDto) {
		return this.jwtService.verify<{ id: string }>(refresh, {
			secret: this.configService.get('ACCESS_JWT_SECRET')
		})
	}

	async findToken({ token }: { token: string }) {
		return this.sessionRepository.findOne({ where: { token } })
	}
}
