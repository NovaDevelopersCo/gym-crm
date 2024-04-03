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

	async getAll() {
		const allDirections = await this.directionRepository.find()
		const formattedDirections = allDirections.map(i => {
			const { name, id } = i
			return { name, id }
		})

		return formattedDirections
	}

	async getById(directionId: number) {
		const direction = await this.directionRepository.findOne({ where: { id: directionId } })

		if (!direction) {
			throw new BadRequestException('Направление не найдено')
		}

		const { id, name } = direction

		return { id, name }
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
