import { StaffEntity } from '@/modules/staff/entities'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash, compare } from 'bcrypt'
import { ILike, Repository, FindOneOptions, In } from 'typeorm'
import { CreateStaffDto, FindAllStaffDto, UpdateStaffDto, UpdatePasswordStaffDto } from './dto'
import { EStaffRole } from '@/core/enums'
import { Pagination } from '@/core/pagination'
import { skipCount } from '@/core/utils'

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(StaffEntity) private readonly staffRepository: Repository<StaffEntity>
	) {}

	async getById(id: number, withError?: boolean, findOptions?: FindOneOptions<StaffEntity>) {
		const staff = await this.staffRepository.findOne({
			where: { id },
			...findOptions
		})

		if (withError && !staff) {
			throw new NotFoundException(`Управляющий с id: ${id} не найден`)
		}

		return staff
	}

	// ! ???
	async getByEmail(email: string) {
		const staff = await this.staffRepository.findOne({ where: { email } })

		if (!staff) {
			throw new NotFoundException(`Управляющий с email: ${email} не найден`)
		}

		return staff
	}

	async create({ password, ...data }: CreateStaffDto) {
		if (data.role === 'director') {
			throw new BadRequestException(
				'Нельзя создать более одного аккаунта управляющего директора'
			)
		}

		const candidate = await this.staffRepository.findOneBy({ email: data.email })

		if (candidate) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}

		const hashPassword = await hash(password, 7)
		const savedStaff = await this.staffRepository.save({ ...data, password: hashPassword })

		const { id, email, role } = savedStaff
		return { id, email, role }
	}

	async getAll({ count, page, sortBy, sortOrder, ...dto }: FindAllStaffDto) {
		const where = {}
		dto.email ? (where['email'] = ILike(`%${dto.email}%`)) : {}
		dto.role ? (where['role'] = dto.role) : {}
		const [items, total] = await this.staffRepository.findAndCount({
			where,
			order: {
				[sortBy]: sortOrder
			},
			take: count,
			skip: skipCount(page, count),
			relations: {
				club: true
			}
		})
		return new Pagination(items, total)
	}

	async update(id: number, dto: UpdateStaffDto) {
		// ! replace logic
		// if (staffId !== id && role !== EStaffRole.DIRECTOR) {
		// 	throw new BadRequestException('Вы не можете менять данные чужого пользователя')
		// }

		const staff = await this.getById(id, true)

		if (staff.email !== dto.email) {
			const oldStaff = await this.staffRepository.findOne({ where: { email: dto.email } })
			if (oldStaff) {
				throw new BadRequestException(`Персонал с email ${dto.email} уже существует`)
			}
			staff.email = dto.email
		}

		const savedStaff = await this.staffRepository.save({ ...staff })
		const { email, role: staffRole } = savedStaff
		return { id, email, role: staffRole }
	}

	async delete(id: number) {
		const staff = await this.getById(id, true)
		if (staff.role === EStaffRole.DIRECTOR) {
			throw new BadRequestException('Нельзя удалить персонал с ролью director')
		}
		await this.staffRepository.delete({ id })
	}

	async checkRole(id: number, role: EStaffRole) {
		const admin = await this.staffRepository.findOne({
			where: { id },
			relations: {
				club: true
			}
		})
		if (!admin) {
			throw new NotFoundException(`Управляющий с id: ${id} не найден`)
		}
		if (admin.role !== role) {
			throw new BadRequestException(`Профиль с id: ${id} не является ${role}`)
		}

		return admin
	}

	async getByIds(ids: number[]) {
		const staffs = await this.staffRepository.find({
			where: { id: In(ids) },
			relations: {
				club: true
			}
		})

		const errorMessages = []

		ids.map(id => {
			const staff = staffs.some(s => s.id === id)
			if (!staff) {
				errorMessages.push(`Персонал с id: ${id} не найден`)
			}
		})

		if (errorMessages.length) {
			throw new BadRequestException(errorMessages)
		}

		return staffs
	}

	async updatePassword(id: number, dto: UpdatePasswordStaffDto) {
		const { password: oldPassword, newPassword } = dto

		const user = await this.getById(id)

		const isPasswordValid = await compare(oldPassword, user.password)
		if (!isPasswordValid) {
			throw new BadRequestException('Неверный пароль')
		}

		const hashPassword = await hash(newPassword, 7)

		return this.staffRepository.save({ ...user, password: hashPassword })
	}

	async clearAdminsClub(ids: number[]) {
		const admins = await this.getByIds(ids)
		admins.forEach(admin => {
			admin.club = null
		})
		return admins
	}
}
