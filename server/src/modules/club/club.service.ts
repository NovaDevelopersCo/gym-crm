import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ILike, In, Repository } from 'typeorm'
import { ClubEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateClubDto, UpdateClubDto, FindAllClubDto } from './dto'
import { StaffService } from '../staff/staff.service'
import { EStaffRole } from '@/core/enums'
import { StaffEntity } from '../staff/entities'
import { DataBaseService } from '@/core/database/database.service'
import { Pagination } from '@/core/pagination'
import { LoggerService } from '@/core/logger/logger.service'
import { skipCount } from '@/core/utils'

@Injectable()
export class ClubService {
	constructor(
		@InjectRepository(ClubEntity)
		private readonly clubRepository: Repository<ClubEntity>,
		private readonly staffService: StaffService,
		private readonly dataBaseService: DataBaseService,
		private readonly logger: LoggerService
	) {}

	public async getAll({ page, count, sortBy, sortOrder, address, name, admins }: FindAllClubDto) {
		// TODO: поменять
		const where = {}
		address ? (where['address'] = ILike(`%${address}%`)) : {}
		name ? (where['name'] = ILike(`%${name}%`)) : {}
		admins?.length ? (where['admins'] = { id: In(admins) }) : {}

		const [items, total] = await this.clubRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},
			where,
			take: count,
			skip: skipCount(page, count),
			relations: {
				admins: true,
				groups: true,
				users: true
			}
		})

		return new Pagination(items, total)
	}

	public async getById(id: number) {
		const club = await this.clubRepository.findOne({
			where: { id },
			relations: {
				admins: true,
				groups: true,
				users: true
			}
		})

		if (!club) {
			throw new NotFoundException(`Клуб с id: ${id} не найден`)
		}

		return club
	}

	public async create({ name, address, admins }: CreateClubDto) {
		await this.nameCheck(name)
		await this.addressCheck(address)
		const adminsList = await this.adminsFreeCheck(admins)
		const createdClub = this.clubRepository.create({
			name,
			address,
			admins: adminsList
		})
		return this.clubRepository.save(createdClub)
	}

	public async update(id: number, dto: UpdateClubDto) {
		const club = await this.getById(id)

		await this.nameCheck(dto.name, id)
		await this.addressCheck(dto.address, id)
		const admins = await this.adminsFreeCheck(dto.admins, id)
		const updatedClub = await this.clubChangeAdminsTransaction(dto.admins, {
			...club,
			...dto,
			admins
		})

		if (!updatedClub) {
			throw new BadRequestException('Ошибка при изменении клуба')
		}

		return updatedClub
	}

	public async delete(id: number) {
		await this.getById(id)

		this.clubRepository.delete({ id })
		return
	}

	private async nameCheck(name: string, clubId?: number) {
		const club = await this.clubRepository.findOne({ where: { name } })

		if (!clubId && club) {
			throw new BadRequestException('Клуб с таким именем уже существует')
		}

		if (club && club.id !== clubId) {
			throw new BadRequestException('Клуб с таким именем уже существует')
		}
	}

	private async adminsFreeCheck(adminIds: number[], clubId?: number) {
		const admins = await this.staffService.getByIds(adminIds)
		const role = EStaffRole.ADMIN
		const checkedAdmins = admins.map(admin => {
			if (admin.role !== role) {
				throw new BadRequestException(`Профиль с id: ${admin.id} не является ${role}`)
			}
			const messageError = `Администратор с id: ${admin.id} уже занят`
			let isError = false
			if (!clubId && admin.club) isError = true
			if (admin.club && admin.club.id !== clubId) isError = true

			if (isError) {
				throw new BadRequestException(messageError)
			}
			delete admin.club
			return admin
		})
		return checkedAdmins
	}

	private async addressCheck(address: string, clubId?: number) {
		const club = await this.clubRepository.findOne({ where: { address } })

		if (!clubId && club) {
			throw new BadRequestException('Клуб с таким адресом уже существует')
		}

		if (club && club.id !== clubId) {
			throw new BadRequestException('Клуб с таким адресом уже существует')
		}
	}

	private async clubChangeAdminsTransaction(adminIds: number[], updatedClub: ClubEntity) {
		return this.dataBaseService.transaction(async queryRunner => {
			const updatedAdmins = await this.staffService.clearAdminsClub(adminIds)
			updatedAdmins.forEach(async admin => {
				await queryRunner.manager.save(StaffEntity, admin)
			})
			const club = await queryRunner.manager.save(ClubEntity, updatedClub)
			return club
		})
	}

	public async checkClubs(ids: number[]) {
		const clubs = await this.clubRepository.find({
			where: {
				id: In(ids)
			}
		})

		if (clubs.length !== ids.length) {
			throw new BadRequestException('Указан несуществующий клуб')
		}

		return clubs
	}
}
