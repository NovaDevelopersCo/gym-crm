import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AbonementEntity } from './entities'
import { ILike, Repository } from 'typeorm'
import { CreateAbonementDto, UpdateAbonementDto, FindAllAbonementDto } from './dto'
import { Pagination } from '@/core/pagination'
import { ClubService } from '../club/club.service'
import { skipCount } from '@/core/utils'

@Injectable()
export class AbonementService {
	constructor(
		@InjectRepository(AbonementEntity)
		private readonly abonementRepository: Repository<AbonementEntity>,
		private readonly clubService: ClubService
	) {}

	public async getAll({ page, count, q, searchBy, sortBy, sortOrder }: FindAllAbonementDto) {
		const [items, total] = await this.abonementRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},
			where: q ? { [searchBy]: ILike(`%${q}%`) } : {},
			take: count,
			skip: skipCount(page, count),
			relations: {
				clubs: true
			}
		})

		return new Pagination(items, total)
	}

	public async getById(id: number) {
		const abonement = await this.abonementRepository.findOne({
			where: { id },
			relations: {
				clubs: true
			}
		})

		if (!abonement) {
			throw new NotFoundException(`Абонемент с id: ${id} не найден`)
		}

		return abonement
	}

	public async create({ name, count, duration, price, clubs: clubIds }: CreateAbonementDto) {
		const clubs = await this.clubService.checkClubs(clubIds)
		await this.nameCheck(name)
		const createdAbonement = this.abonementRepository.create({
			name,
			price,
			count: count ?? null,
			duration: duration ?? null,
			clubs
		})
		return this.abonementRepository.save(createdAbonement)
	}

	public async update(id: number, { name, count, duration, price }: UpdateAbonementDto) {
		const abonement = await this.getById(id)

		await this.nameCheck(name, id)

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

	public async delete(id: number) {
		await this.getById(id)

		this.abonementRepository.delete({ id })
		return
	}

	private async nameCheck(name: string, abonementId?: number) {
		const abonement = await this.abonementRepository.findOne({ where: { name } })

		if (!abonementId && abonement) {
			throw new BadRequestException('Абонемент с таким именем уже существует')
		}

		if (abonement && abonement.id !== abonementId) {
			throw new BadRequestException('Абонемент с таким именем уже существует')
		}
	}
}
