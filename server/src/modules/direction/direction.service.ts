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
			const { name, id, groups } = i
			return { name, id, groups }
		})

		return formattedDirections
	}

	async getById(directionId: number) {
		const direction = await this.directionRepository.findOne({ where: { id: directionId } })

		if (!direction) {
			throw new BadRequestException('Направление не найдено')
		}

		const { id, name, groups } = direction

		return { id, name, groups }
	}

	async create({ name }: CreateDirectionDto) {
		const direction = await this.directionRepository.findOne({ where: { name } })

		if (direction) {
			throw new BadRequestException('Направление с таким именем уже существует')
		}

		const newDirection = this.directionRepository.create({ name })

		const savedDirection = await this.directionRepository.save(newDirection)

		const { id, name: savedName, groups } = savedDirection

		return { id, name: savedName, groups }
	}

	async update(directionId: number, dto: UpdateDirectionDto) {
		const direction = await this.directionRepository.findOne({ where: { id: directionId } })

		if (!direction) {
			throw new BadRequestException(`Направление с id: ${directionId} не найдено`)
		}

		const updatedDirection = await this.directionRepository.save({ ...direction, ...dto })

		const { name, id, groups } = updatedDirection

		return { name, id, groups }
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
