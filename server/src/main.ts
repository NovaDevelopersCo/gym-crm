import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ENodeEnv } from './core/enums'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig, winstonConfig } from '@configs'
import * as cookieParser from 'cookie-parser'
import { WinstonModule } from 'nest-winston'

//TODO: FIX:
// * (Going) make cascade in other schemas
// TODO: return data in update
// TODO: Common decorator with 400s status code
// TODO: common/dto rename in common/query
// TODO: hard search
// TODO: fix swagger style (404 + 400 for query params (getAll))

// * use Pagination class

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger(winstonConfig)
	})
	app.use(cookieParser())
	app.setGlobalPrefix('/api')

	const configService = app.get(ConfigService)

	const NODE_ENV = configService.get('NODE_ENV')

	// function getLoggerInstance() {
	// 	return NODE_ENV === ENodeEnv.PRODUCTION ? createLogger(winstonConfig) : false
	// }

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
