import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'REFRESH_JWT_STRATEGY') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('REFRESH_JWT_SECRET')
		})
	}

	validate = (payload: () => void) => payload()
}
