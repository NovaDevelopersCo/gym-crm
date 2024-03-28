import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig } from '@configs'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('/api')

	const document = SwaggerModule.createDocument(app, swaggerConfig)

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
