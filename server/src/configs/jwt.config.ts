import { ConfigService } from '@nestjs/config'
import { ENodeEnv } from '@/core/enums'

export const getJwtConfig = (config: ConfigService) => {
	const isProduction = config.get('NODE_ENV') === ENodeEnv.PRODUCTION

	return {
		access: {
			expiresIn: isProduction ? '1m' : '30m'
		},
		refresh: {
			expiresIn: '30d'
		}
	}
}
