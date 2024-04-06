import { Repository } from 'typeorm'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { DirectionEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateDirectionDto, UpdateDirectionDto } from './dto'
import { PaginationQueryDto } from '@/core/dto'

@Injectable()
export class DirectionService {
	constructor(
		@InjectRepository(DirectionEntity)
		private readonly directionRepository: Repository<DirectionEntity>
	) {}

	async getAll({ page, count }: PaginationQueryDto) {
		const [items, total] = await this.directionRepository.find({
			take: count,
			skip: page && count ? page * count - count : undefined,
			relations: {
				groups: true
			}
		})

		return {
			items,
			meta: {
				total
			}
		}
	}

	// * checked
	async getById(directionId: number) {
		const direction = await this.directionRepository.findOne({
			where: { id: directionId },
			relations: {
				groups: true
			}
		})

		if (!direction) {
			throw new NotFoundException('Направление не найдено')
		}

		return direction
	}

	// * checked
	async create({ name }: CreateDirectionDto) {
		await this.nameCheck(name)

		const createdDirection = this.directionRepository.create({ name })

		return this.directionRepository.save(createdDirection)
	}

	async update(directionId: number, dto: UpdateDirectionDto) {
		const direction = await this.getById(directionId)

		await this.nameCheck(dto.name, id)

		const updatedDirection = await this.directionRepository.save({ ...direction, ...dto })

		return updatedDirection
	}

	// * checked
	async delete(id: number) {
		await this.getById(id)

		await this.directionRepository.delete({ id })
		return
	}

	private async nameCheck(name: string, directionId?: number) {
		const direction = await this.directionRepository.findOne({ where: { name } })

		if (!directionId && direction) {
			throw new BadRequestException('Направление с таким именем уже существует')
		}

		if (direction && direction.id !== directionId) {
			throw new BadRequestException('Направление с таким именем уже существует')
		}
	}
}
