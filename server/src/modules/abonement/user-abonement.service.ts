import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { UserAbonementEntity } from './entities'
import { UserService } from '../user/user.service'
import { CreateUserAbonementDto, FindAllUserAbonementDto } from './dto'
import { AbonementService } from './abonement.service'
import { formatDate } from './utils'
import { PaginationDto } from '@/core/pagination'

@Injectable()
export class UserAbonementService {
	constructor(
		@InjectRepository(UserAbonementEntity)
		private readonly userAbonementRepository: Repository<UserAbonementEntity>,
		private readonly userService: UserService,
		private readonly abonementService: AbonementService
	) {}

	async create({ userId, abonementId }: CreateUserAbonementDto) {
		await this.userService.getOneById(userId)

		const { price, count, duration } = await this.abonementService.getById(abonementId)

		const dateNow = new Date().toISOString().split('T')[0]

		const createdAbonement = this.userAbonementRepository.create({
			abonement: { id: abonementId },
			price,
			user: { id: userId },
			count,
			start: duration ? dateNow : null,
			end: duration ? this.getFinishDate(duration, dateNow) : null
		})

		return this.userAbonementRepository.save(createdAbonement)
	}

	async getById(id: number) {
		const abonement = await this.userAbonementRepository.findOne({
			where: { id },
			relations: {
				abonement: true,
				user: true
			}
		})

		if (!abonement) {
			throw new NotFoundException(`Абонемент пользователя с id: ${id} не найден`)
		}

		return abonement
	}

	async getAll({ page, count, q, searchBy, sortBy, sortOrder }: FindAllUserAbonementDto) {
		const [items, total] = await this.userAbonementRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},
			take: count,
			skip: page * count - count,
			where: q ? { [searchBy]: ILike(`%${q}%`) } : {}
		})

		return new PaginationDto(items, total)
	}

	async delete(id: number) {
		await this.getById(id)
		await this.userAbonementRepository.delete({ id })
		return
	}

	async finish(id: number) {
		const abonement = await this.getById(id)

		if (!abonement.isFinish) {
			await this.userAbonementRepository.save({ ...abonement, isFinish: true })
		}
	}

	private getFinishDate(duration: string, dateNow: string) {
		// m. y.

		const { prefix, count } = formatDate(duration)

		const date = new Date(dateNow)

		switch (prefix) {
			case 'd.':
				date.setDate(date.getDate() + count)
				break
			case 'm.':
				date.setMonth(date.getMonth() + count)
				break
			case 'y.':
				date.setFullYear(date.getFullYear() + count)
				break
		}

		return date.toISOString().split('T')[0]
	}
}
