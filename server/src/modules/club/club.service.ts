import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, ILike, Repository } from 'typeorm'
import { ClubEntity } from './entities'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateClubDto, UpdateClubDto, FindAllClubDto } from './dto'
import { StaffService } from '../staff/staff.service'
import { EStaffRole } from '@/core/enums'
import { StaffEntity } from '../staff/entities'

@Injectable()
export class ClubService {
	constructor(
		@InjectRepository(ClubEntity)
		private readonly clubRepository: Repository<ClubEntity>,
		private readonly staffService: StaffService,
		private readonly dataSource: DataSource
	) {}
	async getAll({ page, count, q, searchBy, sortBy, sortOrder }: FindAllClubDto) {
		const [items, total] = await this.clubRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},
			where: {
				[searchBy]: ILike(`%${q}%`)
			},
			take: count,
			skip: page && count ? page * count - count : undefined,
			relations: {
				admin: true,
				groups: true,
				users: true
			}
		})

		return {
			items,
			meta: {
				total
			}
		}
	}

	// * checked
	async getById(id: number) {
		const club = await this.clubRepository.findOne({
			where: { id },
			relations: {
				admin: true,
				groups: true,
				users: true
			}
		})

		if (!club) {
			throw new NotFoundException(`Клуб с id: ${id} не найден`)
		}

		return club
	}

	// * checked
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

	async update(id: number, dto: UpdateClubDto) {
		const club = await this.getById(id)

		await this.nameCheck(dto.name, id)

		await this.adminFreeCheck(dto.admin, id)

		await this.addressCheck(dto.address, id)

		const updatedClub = await this.clubChangeAdminTransaction(club.admin.id, {
			...club,
			...dto,
			admin: { id: dto.admin }
		})

		if (!updatedClub) {
			throw new BadRequestException('Ошибка при изменении клуба')
		}

		// eslint-disable-next-line
		const { updateDate, createDate, ...data } = updatedClub

		return data
	}

	// * checked
	async delete(id: number) {
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

	private async adminFreeCheck(adminId: number, clubId?: number) {
		const admin = await this.staffService.checkRole(adminId, EStaffRole.ADMIN)

		if (!clubId && admin.club) {
			throw new BadRequestException('Этот администратор уже занят')
		}

		if (admin.club && admin.club.id !== clubId) {
			throw new BadRequestException('Этот администратор уже занят')
		}

		return admin
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

	private async clubChangeAdminTransaction(
		adminId: number,
		updatedClub: Omit<ClubEntity, 'admin'> & { admin: { id: number } }
	) {
		const queryRunner = this.dataSource.createQueryRunner()

		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			const updatedAdmin = await this.staffService.clearAdminClub(adminId)

			await queryRunner.manager.save(StaffEntity, updatedAdmin)
			const club = await queryRunner.manager.save(ClubEntity, updatedClub)

			await queryRunner.commitTransaction()

			return club
		} catch (e) {
			await queryRunner.rollbackTransaction()
			return null
		} finally {
			await queryRunner.release()
		}
	}
}
