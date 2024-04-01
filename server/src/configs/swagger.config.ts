import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Фитнес CRM')
	.setDescription('')
	.setVersion('1.0.0')
	.addBearerAuth(
		{
			type: 'http',
			scheme: 'bearer'
		},
		'access-token'
	)
	.build()
