import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ClubEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateClubDto, UpdateClubDto } from './dto'
import { StaffService } from '../staff/staff.service'

@Injectable()
export class ClubService {
	constructor(
		@InjectRepository(ClubEntity)
		private readonly clubRepository: Repository<ClubEntity>,
		private readonly staffService: StaffService
	) {}
	async getAll() {
		const clubs = await this.clubRepository.find()

		const formattedClubs = clubs.map(i => {
			const { address, name, admin, groups, users, id } = i
			return { address, name, admin, groups, users, id }
		})

		return { clubs: formattedClubs }
	}

	async getById(clubId: number) {
		const club = await this.clubRepository.findOne({ where: { id: clubId } })

		if (!club) {
			throw new BadRequestException(`Клуб с id: ${clubId} не найден`)
		}

		const { id, name, address, groups, admin, users } = club

		return { id, name, address, groups, admin, users }
	}

	async create(dto: CreateClubDto) {
		const club = await this.clubRepository.findOne({ where: { name: dto.name } })

		if (club) {
			throw new BadRequestException('Клуб с таким названием уже существует')
		}

		const admin = await this.staffService.byId(dto.admin)

		if (!admin) {
			throw new BadRequestException(`Профиль админа с id: ${dto.admin} не найден`)
		}

		if (admin.role !== 'admin') {
			throw new BadRequestException(`Профиль с id: ${dto.admin} не является админом`)
		}

		const newClub = this.clubRepository.create({ ...dto, admin: { id: dto.admin } })

		const savedClub = await this.clubRepository.save(newClub)

		const { id, address, admin: adminBody, groups, users, name } = savedClub

		return { id, address, admin: adminBody, groups, users, name }
	}

	async update(clubId: number, dto: UpdateClubDto) {
		const club = await this.clubRepository.findOne({ where: { id: clubId } })

		if (!club) {
			throw new BadRequestException(`Клуб с id: ${clubId} не найден`)
		}

		const admin = await this.staffService.byId(dto.admin)

		if (!admin) {
			throw new BadRequestException(`Профиль админа с id: ${dto.admin} не найден`)
		}

		if (admin.role !== 'admin') {
			throw new BadRequestException(`Профиль с id: ${dto.admin} не является админом`)
		}

		const updatedClub = await this.clubRepository.save({ ...club, admin: { id: dto.admin } })

		const { id, address, admin: adminBody, groups, users, name } = updatedClub

		return { id, address, admin: adminBody, groups, users, name }
	}

	async delete(id: number) {
		const club = await this.clubRepository.findOne({ where: { id } })

		if (!club) {
			throw new BadRequestException(`Клуб с id: ${id} не найден`)
		}

		const deleteResult = await this.clubRepository.delete({ id })

		return { message: deleteResult.affected > 0 }
	}
}
