import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CLOUDINARY_MODULE_OPTIONS } from './constants'
import { ConfigOptions, v2 } from 'cloudinary'
import { Readable } from 'stream'

@Injectable()
export class CloudinaryService {
	private cloudinary: typeof v2
	constructor(@Inject(CLOUDINARY_MODULE_OPTIONS) options: ConfigOptions) {
		this.cloudinary = v2
		this.cloudinary.config(options)
	}

	// * image: base64
	async uploadFile(image: string, fileName: string, folder: string) {
		try {
			const res = await v2.uploader.upload(image, {
				public_id: fileName,
				folder: `gym/${folder}`
			})
			return res.secure_url
		} catch (e) {
			throw new BadRequestException(e)
		}
	}

	async remove(fileName: string) {
		try {
			const response = await v2.uploader.destroy(fileName)
			return response
		} catch (e) {
			throw new BadRequestException('Error delete image')
		}
	}

	async uploadFilePipe(buffer: Buffer, fileName: string, folder: string) {
		return new Promise((resolve, reject) => {
			const upload_stream = v2.uploader.upload_stream(
				{ public_id: fileName, folder: `gym/${folder}` },
				function (err, image) {
					if (err) return reject(err)
					resolve(image.secure_url)
				}
			)
			const str = Readable.from(buffer)
			str.pipe(upload_stream)
		})
	}
}
