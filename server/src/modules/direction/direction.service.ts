import { Repository } from 'typeorm'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
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

		return { directions: formattedDirections }
	}

	async getById(directionId: number) {
		const direction = await this.directionRepository.findOne({ where: { id: directionId } })

		if (!direction) {
			throw new NotFoundException('Направление не найдено')
		}

		const { id, name, groups } = direction

		return { id, name, groups }
	}

	async create({ name }: CreateDirectionDto) {
		await this.nameCheck(name)

		const newDirection = this.directionRepository.create({ name })

		const savedDirection = await this.directionRepository.save(newDirection)

		const { id, name: savedName, groups } = savedDirection

		return { id, name: savedName, groups }
	}

	async update(directionId: number, dto: UpdateDirectionDto) {
		const direction = await this.getById(directionId)

		await this.nameCheck(dto.name)

		const updatedDirection = await this.directionRepository.save({ ...direction, ...dto })

		const { name, id, groups } = updatedDirection

		return { name, id, groups }
	}

	async delete(id: number) {
		await this.getById(id)

		return this.directionRepository.delete({ id })
	}

	async nameCheck(name: string) {
		const direction = await this.directionRepository.findOne({ where: { name } })

		if (direction) {
			throw new BadRequestException('Направление с таким именем уже существует')
		}
	}
}
