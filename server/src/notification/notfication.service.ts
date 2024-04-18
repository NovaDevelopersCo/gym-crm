import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class NotificationService {
	constructor(
		private readonly configService: ConfigService,
		private readonly mailerService: MailerService
	) {}
	async emailSend() {
		try {
		} catch (e) {}
	}
}
