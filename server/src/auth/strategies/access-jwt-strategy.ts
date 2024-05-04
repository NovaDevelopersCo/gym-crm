import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'ACCESS_JWT_STRATEGY') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('ACCESS_JWT_SECRET')
		})
	}

	validate = (payload: unknown) => payload
}
