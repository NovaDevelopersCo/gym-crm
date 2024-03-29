import { BadRequestException, Injectable } from '@nestjs/common'

import { LoginDto, RefreshDto } from './dto'

import { compare } from 'bcrypt'
import { TokenService } from './token.service'

import { StaffService } from '@/modules/staff/staff.service'
import { StaffEntity } from '@/modules/staff/entities'

@Injectable()
export class AuthService {
	constructor(
		private readonly tokenService: TokenService,
		private readonly staffService: StaffService
	) {}

	async login({ email, password }: LoginDto) {
		const candidate = await this.staffService.byEmail(email)

		if (!candidate) {
			throw new BadRequestException('Профиль не найден')
		}

		const isPasswordValid = await compare(password, candidate.password)

		if (!isPasswordValid) {
			throw new BadRequestException('Неверный пароль')
		}

		const tokens = this.tokenService.generateTokens(candidate)

		await this.tokenService.saveTokenToDb(tokens.refreshToken, candidate.id)

		return tokens
	}

	async refresh(
		refresh: string,
		userId: string
	): Promise<{
		tokens: RefreshDto
		profile: Pick<StaffEntity, 'email' | 'id' | 'role' | 'name'>
	} | null> {
		const tokenFromDb = await this.tokenService.findToken(refresh)
		const user = await this.staffService.byId(+userId)

		if (!tokenFromDb || !user) {
			return null
		}

		const tokens = this.tokenService.generateTokens(user)

		await this.tokenService.saveTokenToDb(tokens.refreshToken, user.id)

		// updateDate and createDate don't need into the client
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, createDate, updateDate, ...data } = user
		return { tokens, profile: data }
	}

	async logout(refresh: string) {
		const candidate = await this.tokenService.byToken(refresh)

		if (candidate) {
			await this.tokenService.removeTokenFromDb(refresh)
		}
	}
}
