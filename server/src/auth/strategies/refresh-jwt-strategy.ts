import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Strategy } from 'passport-jwt'
import type { Request } from 'express'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'REFRESH_JWT_STRATEGY') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: RefreshJwtStrategy.getRefreshFromCookie,
			secretOrKey: configService.get('REFRESH_JWT_SECRET')
		})
	}

	public validate = (payload: unknown) => payload

	public static getRefreshFromCookie(req: Request) {
		return req.cookies['refresh']
	}
}
