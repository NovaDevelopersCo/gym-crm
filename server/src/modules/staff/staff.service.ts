import { StaffEntity } from '@/modules/staff/entities'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateDto } from './dto'

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(StaffEntity) private readonly staffRepository: Repository<StaffEntity>
	) {}

	async byId(id: number) {
		return this.staffRepository.findOne({ where: { id } })
	}

	async byEmail(email: string) {
		return this.staffRepository.findOne({ where: { email } })
	}

	async create({ password, ...data }: CreateDto) {
		if (data.role === 'director') {
			throw new BadRequestException(
				'Нельзя создать более одного аккаунта управляющего директора'
			)
		}

		const candidate = await this.byEmail(data.email)

		if (candidate) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}

		const hashPassword = await hash(password, 7)

		const newUser = this.staffRepository.create({ ...data, password: hashPassword })

		const savedUser = await this.staffRepository.save(newUser)

		const { email, role, id } = savedUser

		return { email, role, id }
	}
}
