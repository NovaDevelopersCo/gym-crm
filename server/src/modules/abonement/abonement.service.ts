import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AbonementEntity } from './entities'
import { ILike, Repository } from 'typeorm'
import { CreateAbonementDto, UpdateAbonementDto, FindAllAbonementDto } from './dto'
import { PaginationDto } from '@/core/pagination'

@Injectable()
export class AbonementService {
	constructor(
		@InjectRepository(AbonementEntity)
		private readonly abonementRepository: Repository<AbonementEntity>
	) {}

	async getAll({ page, count, q, searchBy, sortBy, sortOrder }: FindAllAbonementDto) {
		const [items, total] = await this.abonementRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},
			where: q ? { [searchBy]: ILike(`%${q}%`) } : {},
			take: count,
			skip: page * count - count
		})

		return new PaginationDto(items, total)
	}

	async getById(id: number) {
		const abonement = await this.abonementRepository.findOne({ where: { id } })

		if (!abonement) {
			throw new NotFoundException(`Абонемент с id: ${id} не найден`)
		}

		return abonement
	}

	async create({ name, count, duration, price }: CreateAbonementDto) {
		await this.nameCheck(name)

		if (count && duration) {
			throw new BadRequestException('Абонемент должен быть одного типа')
		}

		const createdAbonement = this.abonementRepository.create({
			name,
			price,
			count: count ?? null,
			duration: duration ?? null
		})

		return this.abonementRepository.save(createdAbonement)
	}

	async update(id: number, { name, count, duration, price }: UpdateAbonementDto) {
		const abonement = await this.getById(id)

		await this.nameCheck(name, id)

		if (count && duration) {
			throw new BadRequestException('Абонемент должен быть одного типа')
		}

		// eslint-disable-next-line
		const { createDate, updateDate, ...data } = await this.abonementRepository.save({
			...abonement,
			price,
			duration,
			count,
			name
		})

		return data
	}

	async delete(id: number) {
		await this.getById(id)

		this.abonementRepository.delete({ id })
		return
	}

	async nameCheck(name: string, abonementId?: number) {
		const club = await this.abonementRepository.findOne({ where: { name } })

		if (!abonementId && club) {
			throw new BadRequestException('Абонемент с таким именем уже существует')
		}

		if (club && club.id !== abonementId) {
			throw new BadRequestException('Абонемент с таким именем уже существует')
		}
	}
}
