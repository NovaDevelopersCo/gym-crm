import { NotificationService } from './notfication.service'
import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
	imports: [MailerModule],
	providers: [NotificationService],
	exports: [NotificationService]
})
export class NotificationModule {}
