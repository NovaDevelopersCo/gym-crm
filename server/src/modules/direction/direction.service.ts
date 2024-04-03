import { Repository } from 'typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'
import { DirectionEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class DirectionService {
	constructor(
		@InjectRepository(DirectionEntity)
		private readonly directionRepository: Repository<DirectionEntity>
	) {}

	getAll() {
		return this.directionRepository.find()
	}

	async getById(id: number) {
		const candidate = await this.directionRepository.findOne({ where: { id } })

		if (!candidate) {
			throw new BadRequestException('Направление не найдено')
		}

		return candidate
	}
}
