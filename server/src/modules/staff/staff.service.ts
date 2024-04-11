import { StaffEntity } from '@/modules/staff/entities'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateDto } from './dto'
import { EStaffRole } from '@/core/enums'

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(StaffEntity) private readonly staffRepository: Repository<StaffEntity>
	) {}

	async getById(staffId: number, withError?: boolean) {
		const staff = await this.staffRepository.findOne({ where: { id: staffId } })

		if (withError && !staff) {
			throw new NotFoundException(`Управляющий с id: ${staffId} не найден`)
		}

		const { fio, email, role, groups, club, id } = staff

		return { fio, email, role, groups, club, id }
	}

	async getByEmail(email: string) {
		const staff = await this.staffRepository.findOne({ where: { email } })

		if (!staff) {
			throw new NotFoundException(`Управляющий с email: ${email} не найден`)
		}

		return staff
	}

	async create({ password, ...data }: CreateDto) {
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

		const savedUser = await this.staffRepository.save({ ...data, password: hashPassword })

		const { email, role, id } = savedUser

		return { email, role, id }
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
