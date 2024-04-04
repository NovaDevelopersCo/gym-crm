import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ClubEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateClubDto, UpdateClubDto } from './dto'
import { StaffService } from '../staff/staff.service'
import { EStaffRole } from '@/core/enums'
import { StaffEntity } from '../staff/entities'

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

		this.adminFreeCheck(admin)
		await this.addressCheck(dto.address)

		const newClub = this.clubRepository.create({ ...dto, admin: { id: dto.admin } })

		const savedClub = await this.clubRepository.save(newClub)

		const { id, address, admin: adminBody, groups, users, name } = savedClub

		return { id, address, admin: adminBody, groups, users, name }
	}

	async update(clubId: number, dto: UpdateClubDto) {
		const club = await this.getById(clubId)

		await this.nameCheck(dto.name)

		const admin = await this.staffService.checkRole(dto.admin, EStaffRole.ADMIN)

		this.adminFreeCheck(admin, clubId)
		await this.addressCheck(dto.address)

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

		this.clubRepository.delete({ id })
		return
	}

	async nameCheck(name: string) {
		const club = await this.clubRepository.findOne({ where: { name } })

		if (club) {
			throw new BadRequestException('Клуб с таким именем уже существует')
		}
	}

	adminFreeCheck(
		admin: Omit<StaffEntity, 'password' | 'createDate' | 'updateDate'>,
		clubId?: number
	) {
		if (admin.club.id) {
			throw new BadRequestException('Этот администратор уже занят')
		}

		if (clubId && admin.club.id !== clubId) {
			throw new BadRequestException('Этот администратор уже занят')
		}
	}

	async addressCheck(address: string) {
		const club = await this.clubRepository.findOne({ where: { address } })

		if (club) {
			throw new BadRequestException('Клуб с таким адресом уже существует')
		}
	}
}
