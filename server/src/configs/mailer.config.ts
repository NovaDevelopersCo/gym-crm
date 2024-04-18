import { ConfigService } from '@nestjs/config'

export const getMailerConfig = async (configService: ConfigService) => {
	return {
		transport: {
			host: configService.get('MAIL_HOST'),
			port: 465,
			secure: true,
			auth: {
				user: configService.get('MAIL_USER'),
				pass: configService.get('MAIL_PASSWORD')
			}
		}
	}
}
