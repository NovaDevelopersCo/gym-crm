import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, In, Repository } from 'typeorm'
import { UserAbonementEntity } from './entities'
import { UserService } from '../user/user.service'
import { CreateUserAbonementDto, FindAllUserAbonementDto } from './dto'
import { AbonementService } from './abonement.service'
import { formatDate } from './utils'
import { Pagination } from '@/core/pagination'
import { skipCount } from '@/core/utils'
import { returnSelectUser } from '../user/dto'

@Injectable()
export class UserAbonementService {
	constructor(
		@InjectRepository(UserAbonementEntity)
		private readonly userAbonementRepository: Repository<UserAbonementEntity>,
		private readonly userService: UserService,
		private readonly abonementService: AbonementService
	) {}

	public async create({ userId, abonementId }: CreateUserAbonementDto) {
		await this.userService.getOneById(userId)

		const abonement = await this.userAbonementRepository.findOne({
			where: {
				abonement: {
					id: abonementId
				},
				user: {
					id: userId
				}
			}
		})

		if (abonement) {
			throw new BadRequestException('У этого пользователя уже есть такой абонемент')
		}

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

	public async getById(id: number) {
		const abonement = await this.userAbonementRepository.findOne({
			where: { id },
			relations: {
				abonement: true,
				user: true
			},
			select: {
				user: returnSelectUser
			}
		})

		if (!abonement) {
			throw new NotFoundException(`Абонемент пользователя с id: ${id} не найден`)
		}

		return abonement
	}

	public async getAll({
		page,
		count,
		sortBy,
		sortOrder,
		isFinish,
		abomenents,
		users,
		price
	}: FindAllUserAbonementDto) {
		const where = {}
		const isBoolean = ['true', 'false'].includes(isFinish)
		if (isBoolean) where['isFinish'] = isFinish === 'true'
		abomenents?.length ? (where['abomenent'] = { id: In(abomenents) }) : {}
		users?.length ? (where['user'] = { id: In(users) }) : {}
		if (price) {
			if (typeof price === 'number') {
				where['price'] = price
			}
			if (Array.isArray(price)) {
				const sorted = price.sort()
				where['price'] = Between(sorted[0], sorted[1])
			}
		}

		const [items, total] = await this.userAbonementRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},
			take: count,
			skip: skipCount(page, count),
			where,
			relations: {
				user: true,
				abonement: true
			},
			select: {
				user: returnSelectUser
			}
		})

		return new Pagination(items, total)
	}

	public async delete(id: number) {
		await this.getById(id)
		await this.userAbonementRepository.delete({ id })
		return
	}

	public async finish(id: number) {
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
