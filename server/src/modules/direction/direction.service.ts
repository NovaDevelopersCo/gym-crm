import { ILike, In, Repository } from 'typeorm'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { DirectionEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateDirectionDto, UpdateDirectionDto, FindAllDirectionDto } from './dto'
import { Pagination } from '@/core/pagination'
import { skipCount } from '@/core/utils'

@Injectable()
export class DirectionService {
	constructor(
		@InjectRepository(DirectionEntity)
		private readonly directionRepository: Repository<DirectionEntity>
	) {}

	async getAll({ page, count, sortBy, sortOrder, ...dto }: FindAllDirectionDto) {
		// ! проверить как работает
		const where = {}
		dto.name ? (where['name'] = ILike(`%${dto.name}%`)) : {}
		dto.groups?.length ? (where['groups'] = { id: In(dto.groups) }) : {}
		const [items, total] = await this.directionRepository.findAndCount({
			order: {
				[sortBy]: [sortOrder]
			},
			where,
			take: count,
			skip: skipCount(page, count),
			relations: {
				groups: true
			}
		})

		return new Pagination(items, total)
	}

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

	async create({ name }: CreateDirectionDto) {
		await this.nameCheck(name)

		const createdDirection = this.directionRepository.create({ name })

		return this.directionRepository.save(createdDirection)
	}

	async update(id: number, dto: UpdateDirectionDto) {
		const direction = await this.getById(id)

		await this.nameCheck(dto.name, id)

		// eslint-disable-next-line
		const { createDate, updateDate, ...data } = await this.directionRepository.save({
			...direction,
			...dto
		})

		return data
	}

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
