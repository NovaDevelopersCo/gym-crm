import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ClubEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateClubDto, UpdateClubDto } from './dto'
import { StaffService } from '../staff/staff.service'
import { EStaffRole } from '@/core/enums'

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
			throw new NotFoundException(`Клуб с id: ${clubId} не найден`)
		}

		const { id, name, address, groups, admin, users } = club

		return { id, name, address, groups, admin, users }
	}

	async create(dto: CreateClubDto) {
		await this.nameCheck(dto.name)

		const admin = await this.staffService.checkRole(dto.admin, EStaffRole.ADMIN)

		if (admin.club && admin.club.id) {
			throw new BadRequestException('За этим администратором уже закреплен клуб')
		}

		const newClub = this.clubRepository.create({ ...dto, admin: { id: dto.admin } })

		const savedClub = await this.clubRepository.save(newClub)

		const { id, address, admin: adminBody, groups, users, name } = savedClub

		return { id, address, admin: adminBody, groups, users, name }
	}

	async update(clubId: number, dto: UpdateClubDto) {
		const club = await this.getById(clubId)

		const admin = await this.staffService.checkRole(dto.admin, EStaffRole.ADMIN)

		// вынести проверку занятости админа в метод
		if (admin.club.id && admin.club.id !== clubId) {
			throw new BadRequestException('За этим администратором уже закреплен клуб')
		}

		await this.nameCheck(dto.name)

		const updatedClub = await this.clubRepository.save({
			...club,
			...dto,
			admin: { id: dto.admin }
		})

		const { id, address, admin: adminBody, groups, users, name } = updatedClub

		return { id, address, admin: adminBody, groups, users, name }
	}

	async delete(id: number) {
		await this.getById(id)

		return this.clubRepository.delete({ id })
	}

	async nameCheck(name: string) {
		const club = await this.clubRepository.findOne({ where: { name } })

		if (club) {
			throw new BadRequestException('Клуб с таким именем уже существует')
		}
	}
}
