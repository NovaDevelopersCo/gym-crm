import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GroupEntity } from './entities'
import { Repository } from 'typeorm'
import { CreateGroupDto, UpdateGroupDto } from './dto'
import { StaffService } from '../staff/staff.service'
import { ClubService } from '../club/club.service'
import { DirectionService } from '../direction/direction.service'
import { EStaffRole } from '@/core/enums'
import { PaginationQueryDto } from '@/core/dto'

@Injectable()
export class GroupService {
	constructor(
		@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
		private readonly staffService: StaffService,
		private readonly clubService: ClubService,
		private readonly directionService: DirectionService
	) {}

	async getAll({ page, count }: PaginationQueryDto) {
		const [items, total] = await this.groupRepository.findAndCount({
			take: count,
			skip: page && count ? page * count - count : undefined,
			relations: {
				direction: true,
				club: true,
				trainer: true,
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

	//  * checked
	async getById(groupId: number) {
		const group = await this.groupRepository.findOne({
			where: { id: groupId },
			relations: {
				direction: true,
				club: true,
				trainer: true,
				users: true
			}
		})

		if (!group) {
			throw new NotFoundException(`Группы с id: ${groupId} не найдено`)
		}

		return group
	}
	// * checked, its beautiful!!!
	async create(dto: CreateGroupDto) {
		await this.checkName(dto.name)

		const trainer = await this.staffService.checkRole(dto.trainer, EStaffRole.TRAINER)

		await this.clubService.getById(dto.club)
		await this.directionService.getById(dto.direction)

		const createdGroup = this.groupRepository.create({
			...dto,
			direction: { id: dto.direction },
			club: { id: dto.club },
			trainer: { id: trainer.id }
		})

		return this.groupRepository.save(createdGroup)
	}

	// * checked
	async update(groupId: number, dto: UpdateGroupDto) {
		const group = await this.getById(groupId)
		await this.checkName(dto.name, groupId)
		await this.clubService.getById(dto.club)
		await this.staffService.getById(dto.trainer, true)
		await this.directionService.getById(dto.direction)

		// eslint-disable-next-line
		const { createDate, updateDate, ...data } = await this.groupRepository.save({
			...group,
			...dto,
			direction: { id: dto.direction },
			trainer: { id: dto.trainer },
			club: { id: dto.club }
		})
		return data
	}

	// * checked
	async delete(id: number) {
		await this.getById(id)

		await this.groupRepository.delete({ id })
		return
	}

	private async checkName(name: string, groupId?: number) {
		const group = await this.groupRepository.findOne({ where: { name } })

		if (!groupId && group) {
			throw new BadRequestException('Группа с таким именем уже существует')
		}

		if (group && group.id !== groupId) {
			throw new BadRequestException('Группа с таким именем уже существует')
		}
	}
}
