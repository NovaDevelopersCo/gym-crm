import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('/api')

	const config = new DocumentBuilder()
		.setTitle('Фитнес CRM')
		.setDescription('')
		.setVersion('1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('/api/docs', app, document)

	const configService = app.get(ConfigService)
	const PORT = configService.get('PORT')
	const CLIENT_URL = configService.get('CLIENT_URL')

	app.enableCors({
		origin: CLIENT_URL,
		credentials: true
	})

	await app.listen(PORT)
	console.log('Server started on port ' + PORT)
}
bootstrap()
