import { ConfigService } from '@nestjs/config'
import { ConfigOptions } from 'cloudinary'

export const getCloudinaryConfig = (config: ConfigService): ConfigOptions => {
	return {
		cloud_name: config.get('CLOUD_NAME'),
		api_key: config.get('CLOUD_API_KEY'),
		api_secret: config.get('CLOUD_API_SECRET')
	}
}
