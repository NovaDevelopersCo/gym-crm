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

	public async getAll({ page, count, sortBy, sortOrder, name, groups }: FindAllDirectionDto) {
		// ! проверить как работает
		const where = {}
		name ? (where['name'] = ILike(`%${name}%`)) : {}
		groups?.length ? (where['groups'] = { id: In(groups) }) : {}
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

	public async getById(directionId: number) {
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

	public async create({ name }: CreateDirectionDto) {
		await this.nameCheck(name)

		const createdDirection = this.directionRepository.create({ name })

		return this.directionRepository.save(createdDirection)
	}

	public async update(id: number, dto: UpdateDirectionDto) {
		const direction = await this.getById(id)

		await this.nameCheck(dto.name, id)

		return this.directionRepository.save({
			...direction,
			...dto
		})
	}

	public async delete(id: number) {
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
