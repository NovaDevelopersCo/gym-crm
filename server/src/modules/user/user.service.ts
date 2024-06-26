import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUserDto, FindAllUserDto, UpdateUserDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities'
import { ILike, In, MoreThanOrEqual, Repository } from 'typeorm'
import { GroupService } from '@/modules/group/group.service'
import { ClubService } from '@/modules/club/club.service'
import { Pagination } from '@/core/pagination'
import { GroupEntity } from '../group/entities'
import { StaffService } from '../staff/staff.service'
import { EStaffRole } from '@/core/enums'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly groupService: GroupService,
		private readonly clubService: ClubService,
		private readonly staffService: StaffService
	) {}

	public async create({ email, phone, instagram, ...dto }: CreateUserDto) {
		const oldUser = await this.userRepository.findOne({
			where: [{ email }, { phone }, { instagram }]
		})

		if (oldUser) {
			const messages = []
			const msg = (field: string) => `Данный ${field} уже используется другим пользователем`

			if (oldUser.email === email) messages.push(msg('Email'))

			if (oldUser.phone === phone) messages.push(msg('Номер телефона'))

			if (oldUser.instagram === instagram) messages.push(msg('Инстаграм'))

			throw new BadRequestException(messages)
		}

		await this.clubService.getById(dto.club)
		const groups = await this.groupService.getByIds(dto.groups)

		this.checkAllGroupInClub(groups, dto.club)

		const createdUser = this.userRepository.create({
			email,
			phone,
			instagram,
			...dto,
			groups,
			club: {
				id: dto.club
			}
		})
		return this.userRepository.save(createdUser)
	}

	public async getById(id: number, staffId: number) {
		const staff = await this.staffService.getById(staffId, true, { relations: { club: true } })

		const isAdmin = staff.role === EStaffRole.ADMIN

		const user = await this.getOneById(id)

		if (isAdmin && user.club !== staff.club) {
			throw new ForbiddenException('Этот пользователь не относится к вашему клубу')
		}

		return user
	}

	public async getOneById(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: {
				groups: {
					club: true
				},
				club: true,
				abonements: true,
				orders: true
			}
		})

		if (!user) {
			throw new NotFoundException(`Пользователя с id: ${id} не найдено`)
		}

		return user
	}

	public async getAll(
		staffId: number,
		{
			count,
			page,
			sortBy,
			sortOrder,
			fio,
			email,
			howKnow,
			instagram,
			groups,
			clubs,
			phone,
			fromDateRegistration,
			fromBirthday
		}: FindAllUserDto
	) {
		const staff = await this.staffService.getById(staffId, true, { relations: { club: true } })
		const isAdmin = staff.role === EStaffRole.ADMIN

		const where = {}
		fio ? (where['fio'] = ILike(`%${fio}%`)) : {}
		email ? (where['email'] = ILike(`%${email}%`)) : {}
		howKnow ? (where['howKnow'] = ILike(`%${howKnow}%`)) : {}
		instagram ? (where['instagram'] = ILike(`%${instagram}%`)) : {}
		phone ? (where['phone'] = ILike(`%${phone}%`)) : {}
		fromDateRegistration ? (where['createDate'] = MoreThanOrEqual(fromDateRegistration)) : {}
		fromBirthday ? (where['birthday'] = MoreThanOrEqual(fromBirthday)) : {}
		groups?.length ? (where['groups'] = { id: In(groups) }) : {}
		clubs?.length ? (where['club'] = { id: In(clubs) }) : {}

		// TODO: если клуба нет?
		if (isAdmin) where['club'] = { id: staff.club?.id }

		const [users, total] = await this.userRepository.findAndCount({
			where,
			order: {
				[sortBy]: sortOrder
			},
			take: count,
			skip: count * page - count,
			relations: {
				groups: true,
				club: true,
				abonements: true
			}
		})

		return new Pagination(users, total)
	}

	public async update(id: number, dto: UpdateUserDto) {
		const user = await this.getOneById(id)

		await this.checkEmail(dto.email, id)
		await this.checkPhone(dto.phone, id)
		await this.checkInstagram(dto.instagram, id)

		// TODO: if club null ?
		let club = user.club
		if (dto.club !== user.club.id) club = await this.clubService.getById(dto.club)

		const oldGroups = user.groups.map(group => group.id)
		const check = this.checkArraysEqual(oldGroups, dto.groups)
		let groups = user.groups
		if (!check) {
			groups = await this.groupService.getByIds(dto.groups)
			this.checkAllGroupInClub(groups, dto.club)
		}

		const {
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

	public async delete(id: number) {
		await this.getOneById(id)

		await this.userRepository.delete({ id })
		return
	}

	private checkArraysEqual(firstArray: unknown[], secondArray: unknown[]) {
		const uniqueFirstArray = [...new Set(firstArray)].sort()
		const uniqueSecondArray = [...new Set(secondArray)].sort()
		return uniqueFirstArray.toString() === uniqueSecondArray.toString()
	}

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

	private async checkInstagram(instagram: string, userId?: number) {
		const user = await this.userRepository.findOne({ where: { instagram } })

		if (!userId && user) {
			throw new BadRequestException('Пользователь с таким instagram уже существует')
		}

		if (user && user.id !== userId) {
			throw new BadRequestException('Пользователь с таким instagram уже существует')
		}
	}

	private checkAllGroupInClub(groups: GroupEntity[], clubId: number) {
		groups.forEach(group => {
			if (group.club?.id !== clubId) {
				throw new BadRequestException(
					`Группы с id: ${group.id} нет в клубе с id: ${clubId}`
				)
			}
		})
	}
}
