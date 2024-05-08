import { Inject, Injectable } from '@nestjs/common'
import { StaffEntity } from '@/modules/staff/entities'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { SessionEntity } from './entities'
import { Repository } from 'typeorm'
import { JWT_CONFIG_PROVIDE } from '@/core/constants'
import { getJwtConfig } from '@/configs'

@Injectable()
export class TokenService {
	constructor(
		@InjectRepository(SessionEntity)
		private readonly sessionRepository: Repository<SessionEntity>,
		@Inject(JWT_CONFIG_PROVIDE)
		private readonly jwtConfig: ReturnType<typeof getJwtConfig>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	generateTokens({
		email,
		id,
		role
	}: Omit<StaffEntity, 'createDate' | 'updateDate' | 'password'>) {
		const payload = { email, id, role }
		const { access, refresh } = this.jwtConfig

		const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.get('ACCESS_JWT_SECRET'),
			...access
		})

		const refreshToken = this.jwtService.sign(payload, {
			secret: this.configService.get('REFRESH_JWT_SECRET'),
			...refresh
		})

		return { accessToken, refreshToken }
	}

	async saveTokenToDb(token: string, user: number) {
		const oldSession = await this.sessionRepository.findOne({ where: { user } })

		if (oldSession) {
			return this.sessionRepository.save({
				...oldSession,
				token
			})
		}

		return this.sessionRepository.save({ token, user })
	}

	async validateAccessToken(access: string) {
		return this.jwtService.verify(access, {
			secret: this.configService.get('ACCESS_JWT_SECRET')
		})
	}

	async findToken(token: string) {
		return this.sessionRepository.findOne({ where: { token } })
	}

	async byToken(refresh: string) {
		return this.sessionRepository.findOne({ where: { token: refresh } })
	}

	async removeTokenFromDb(refresh: string) {
		return this.sessionRepository.delete({ token: refresh })
	}
}
