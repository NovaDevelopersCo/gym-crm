import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto, FindAllUserDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities'
import { ILike, Repository } from 'typeorm'
import { GroupService } from '@modules/group/group.service'
import { ClubService } from '@modules/club/club.service'
import { PaginationDto } from '@/core/pagination'
import { GroupEntity } from '../group/entities'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly groupService: GroupService,
		private readonly clubService: ClubService
	) {}

	async create({ email, phone, cardNumber, ...dto }: CreateUserDto) {
		const oldUser = await this.userRepository.findOne({
			where: [{ email }, { phone }, { cardNumber }]
		})

		if (oldUser) {
			const messages = []
			const msg = (field: string) => `Данный ${field} уже используется другим пользователем`

			if (oldUser.email === email) messages.push(msg('Email'))

			if (oldUser.phone === phone) messages.push(msg('Номер телефона'))

			if (oldUser.cardNumber === cardNumber) messages.push(msg('Номер карты'))

			throw new BadRequestException(messages)
		}

		await this.clubService.getById(dto.club)
		const groups = await this.groupService.getByIds(dto.groups)

		this.checkAllGroupInClub(groups, dto.club)

		const createdUser = this.userRepository.create({
			email,
			phone,
			cardNumber,
			...dto,
			groups,
			club: {
				id: dto.club
			}
		})
		const savedUser = await this.userRepository.save(createdUser)
		return {
			id: savedUser.id,
			email: savedUser.email,
			phone: savedUser.phone,
			fio: savedUser.fio
		}
	}

	async getOneById(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: {
				groups: true,
				club: true
			}
		})

		if (!user) throw new NotFoundException(`Пользователя с id: ${id} не найдено`)

		return user
	}

	async findAll({ count, page, q, searchBy, sortOrder, sortBy }: FindAllUserDto) {
		const [users, total] = await this.userRepository.findAndCount({
			where: {
				[searchBy]: ILike(`%${q}%`)
			},
			order: {
				[sortBy]: sortOrder
			},
			take: count,
			skip: count * page - count,
			relations: {
				groups: true,
				club: true
			}
		})

		return new PaginationDto(users, total)
	}

	async update(id: number, dto: CreateUserDto) {
		const user = await this.getOneById(id)

		if (dto.email !== user.email) await this.checkEmail(dto.email)
		if (dto.cardNumber !== user.cardNumber) await this.checkCardNumber(dto.cardNumber)
		if (dto.phone !== user.phone) await this.checkPhone(dto.phone)

		let club = user.club
		if (dto.club !== user.club.id) club = await this.clubService.getById(dto.club)

		const oldGroups = user.groups.map(group => group.id)
		const check = this.checkArraysEqual(oldGroups, dto.groups)
		let groups = user.groups
		if (!check) {
			groups = await this.groupService.getByIds(dto.groups)
			this.checkAllGroupInClub(groups, dto.club)
		}

		// eslint-disable-next-line
		const {
			// eslint-disable-next-line
			createDate,
			// eslint-disable-next-line
			updateDate,
			// eslint-disable-next-line
			club: { users, createDate: c, updateDate: u, groups: cg, ...clubData },
			...data
		} = await this.userRepository.save({
			...user,
			...dto,
			groups,
			club
		})
		return {
			...data,
			club: { ...clubData }
		}
	}

	//! isDelete: true
	// ! beta
	async delete(id: number) {
		await this.getOneById(id)

		await this.userRepository.delete({ id })
		return
	}

	private checkArraysEqual(firstArray: unknown[], secondArray: unknown[]) {
		const uniqueFirstArray = [...new Set(firstArray)].sort()
		const uniqueSecondArray = [...new Set(secondArray)].sort()
		return uniqueFirstArray.toString() === uniqueSecondArray.toString()
	}

	// * For checking
	private async checkEmail(email: string, userId?: number) {
		const user = await this.userRepository.findOne({ where: { email } })

		if (!userId && user) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}

		if (user && user.id !== userId) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}
	}

	private async checkPhone(phone: string, userId?: number) {
		const user = await this.userRepository.findOne({ where: { phone } })

		if (!userId && user) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}

		if (user && user.id !== userId) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}
	}

	private async checkCardNumber(cardNumber: string, userId?: number) {
		const user = await this.userRepository.findOne({ where: { cardNumber } })

		if (!userId && user) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}

		if (user && user.id !== userId) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}
	}

	private checkAllGroupInClub(groups: GroupEntity[], clubId: number) {
		groups.forEach(group => {
			if (group.club.id !== clubId) {
				throw new BadRequestException(
					`Группы с id: ${group.id} нет в клубе с id: ${clubId}`
				)
			}
		})
	}
}
