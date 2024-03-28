import { StaffEntity } from '@/auth/entities'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(StaffEntity) private readonly staffRepository: Repository<StaffEntity>
	) {}

	async getById({ id }: { id: number }) {
		return this.staffRepository.findOne({ where: { id } })
	}
}
