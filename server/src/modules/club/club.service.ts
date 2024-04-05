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
		const clubs = await this.clubRepository.find({
			relations: {
				admin: true,
				groups: true,
				users: true
			}
		})

		return { clubs }
	}

	async getById(clubId: number) {
		const club = await this.clubRepository.findOne({
			where: { id: clubId },
			relations: {
				admin: true,
				groups: true,
				users: true
			}
		})

		if (!club) {
			throw new NotFoundException(`Клуб с id: ${clubId} не найден`)
		}

		return club
	}

	async create(dto: CreateClubDto) {
		await this.nameCheck(dto.name)
		await this.adminFreeCheck(dto.admin)
		await this.addressCheck(dto.address)

		const createClub = this.clubRepository.create({
			...dto,
			admin: { id: dto.admin }
		})

		return this.clubRepository.save(createClub)
	}

	async update(clubId: number, dto: UpdateClubDto) {
		const club = await this.getById(clubId)

		await this.nameCheck(dto.name, clubId)

		await this.adminFreeCheck(dto.admin, clubId)
		await this.addressCheck(dto.address, clubId)

		return this.clubRepository.save({
			...club,
			...dto,
			admin: { id: dto.admin }
		})
	}

	async delete(id: number) {
		await this.getById(id)

		this.clubRepository.delete({ id })
		return
	}

	async nameCheck(name: string, clubId?: number) {
		const club = await this.clubRepository.findOne({ where: { name } })

		if (!clubId && club) {
			throw new BadRequestException('Клуб с таким именем уже существует')
		}

		if (club && club.id !== clubId) {
			throw new BadRequestException('Клуб с таким именем уже существует')
		}
	}

	async adminFreeCheck(adminId: number, clubId?: number) {
		const admin = await this.staffService.checkRole(adminId, EStaffRole.ADMIN)

		if (!clubId && admin.club) {
			throw new BadRequestException('Этот администратор уже занят')
		}

		if (admin.club && admin.club.id !== clubId) {
			throw new BadRequestException('Этот администратор уже занят')
		}

		return admin
	}

	async addressCheck(address: string, clubId?: number) {
		const club = await this.clubRepository.findOne({ where: { address } })

		if (!clubId && club) {
			throw new BadRequestException('Клуб с таким адресом уже существует')
		}

		if (club && club.id !== clubId) {
			throw new BadRequestException('Клуб с таким адресом уже существует')
		}
	}
}
