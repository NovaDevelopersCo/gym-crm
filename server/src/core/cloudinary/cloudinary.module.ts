import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { ICloudinaryModuleAsyncOptions } from './interfaces'
import { CLOUDINARY_MODULE_OPTIONS } from './constants'

@Global()
@Module({})
export class CloudinaryModule {
	static forRootAsync(options: ICloudinaryModuleAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options)
		return {
			module: CloudinaryModule,
			imports: options.imports,
			providers: [CloudinaryService, asyncOptions],
			exports: [CloudinaryService]
		}
	}

	private static createAsyncOptionsProvider(options: ICloudinaryModuleAsyncOptions): Provider {
		return {
			provide: CLOUDINARY_MODULE_OPTIONS,
			useFactory: async (...args: unknown[]) => {
				const config = await options.useFactory(...args)
				return config
			},
			inject: options.inject || []
		}
	}
}
