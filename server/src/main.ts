import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ENodeEnv } from './core/enums'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig } from '@configs'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(cookieParser())
	app.setGlobalPrefix('/api')

	const configService = app.get(ConfigService)

	const NODE_ENV = configService.get('NODE_ENV')

	const PORT = configService.get('PORT')
	const CLIENT_URL = configService.get('CLIENT_URL')

	if (NODE_ENV === ENodeEnv.DEVELOPMENT) {
		const document = SwaggerModule.createDocument(app, swaggerConfig)
		SwaggerModule.setup('/api/docs', app, document)
	}

	app.enableCors({
		origin: CLIENT_URL,
		credentials: true
	})

	await app.listen(PORT)
	console.log('Server started on port ' + PORT)
}
bootstrap()
