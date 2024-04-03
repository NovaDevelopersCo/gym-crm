import { Repository } from 'typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'
import { DirectionEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateDirectionDto, UpdateDirectionDto } from './dto'

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

	async create({ name }: CreateDirectionDto) {
		const direction = await this.directionRepository.findOne({ where: { name } })

		if (direction) {
			throw new BadRequestException('Направление с таким именем уже существует')
		}

		const newDirection = this.directionRepository.create({ name })

		const savedDirection = await this.directionRepository.save(newDirection)

		const { id, name: savedName } = savedDirection

		return { id, name: savedName }
	}

	async update(directionId: number, dto: UpdateDirectionDto) {
		const direction = await this.directionRepository.findOne({ where: { id: directionId } })

		if (!direction) {
			throw new BadRequestException(`Направление с id: ${directionId} не найдено`)
		}

		const updatedDirection = await this.directionRepository.save({ ...direction, ...dto })

		const { name, id } = updatedDirection

		return { name, id }
	}

	async delete(id: number) {
		const direction = await this.directionRepository.findOne({ where: { id } })

		if (!direction) {
			throw new BadRequestException(`Направление с id: ${id} не найдено`)
		}

		const deleteResult = await this.directionRepository.delete({ id })

		return { message: deleteResult.affected > 0 }
	}
}
