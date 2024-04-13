import { StaffEntity } from '@/modules/staff/entities'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcrypt'
import { ILike, Repository } from 'typeorm'
import { CreateStaffDto, FindAllStaffDto, UpdateStaffDto } from './dto'
import { EStaffRole } from '@/core/enums'

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(StaffEntity) private readonly staffRepository: Repository<StaffEntity>
	) {}

	async getById(id: number, withError?: boolean) {
		const staff = await this.staffRepository.findOne({
			where: { id },
			relations: { club: true }
		})

		if (withError && !staff) {
			throw new NotFoundException(`Управляющий с id: ${id} не найден`)
		}
		const { fio, email, role, club } = staff
		return { fio, email, role, club, id }
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

		const { id, email, role, fio } = savedStaff
		return { id, email, role, fio }
	}

	async getAll({ sortBy, count, page, q, searchBy, sortOrder }: FindAllStaffDto) {
		const [items, total] = await this.staffRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},
			where: {
				[searchBy]: ILike(`%${q}%`)
			},
			take: count,
			skip: page * count - count,
			relations: {
				club: true
			}
		})

		// ! replace
		return {
			items,
			meta: {
				total
			}
		}
	}

	async update(id: number, dto: UpdateStaffDto) {
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

		if (staff.fio === dto.fio) staff.fio = dto.fio

		const savedStaff = await this.staffRepository.save({ ...staff })
		const { email, fio, role: staffRole } = savedStaff
		return { id, email, fio, role: staffRole }
	}

	//! Обсудить
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

	async clearAdminClub(id: number) {
		const admin = await this.staffRepository.findOne({ where: { id } })

		admin.club = null

		return admin
	}
}
