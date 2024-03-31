import { Injectable } from '@nestjs/common'
import { CloudinaryService } from '@core/cloudinary/cloudinary.service'
import { randomUUID } from 'crypto'

@Injectable()
export class FileService {
	constructor(private cloudinaryService: CloudinaryService) {}

	// * image: base64 string
	async uploadBase64(image: string) {
		const fileName = randomUUID()
		return await this.cloudinaryService.uploadFile(image, fileName, 'test')
	}

	async uploadFile(file: Express.Multer.File) {
		const fileName = randomUUID()
		return await this.cloudinaryService.uploadFilePipe(file.buffer, fileName, 'test')
	}

	async remove(path: string) {
		return await this.cloudinaryService.remove(path)
	}
}
