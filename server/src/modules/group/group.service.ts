import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GroupEntity } from './entities'
import { Repository } from 'typeorm'
import { CreateGroupDto, UpdateGroupDto } from './dto'
import { StaffService } from '../staff/staff.service'
import { ClubService } from '../club/club.service'
import { DirectionService } from '../direction/direction.service'
import { EStaffRole } from '@/core/enums'

@Injectable()
export class GroupService {
	constructor(
		@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
		private readonly staffService: StaffService,
		private readonly clubService: ClubService,
		private readonly directionService: DirectionService
	) {}

	async getAll() {
		const groups = await this.groupRepository.find({
			relations: {
				direction: true,
				club: true,
				trainer: true,
				users: true
			}
		})
		return { groups }
	}

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

	async update(groupId: number, dto: UpdateGroupDto) {
		const group = await this.getById(groupId)

		await this.checkName(dto.name, groupId)
		await this.clubService.getById(dto.club)
		await this.staffService.getById(dto.trainer)
		await this.directionService.getById(dto.direction)

		const savedGroup = await this.groupRepository.save({
			...group,
			...dto,
			direction: { id: dto.direction },
			trainer: { id: dto.trainer },
			club: { id: dto.club }
		})

		return savedGroup
	}

	async delete(id: number) {
		await this.getById(id)

		await this.groupRepository.delete({ id })
		return
	}

	async checkName(name: string, groupId?: number) {
		const group = await this.groupRepository.findOne({ where: { name } })

		if (!groupId && group) {
			throw new BadRequestException('Группа с таким именем уже существует')
		}

		if (group && group.id !== groupId) {
			throw new BadRequestException('Группа с таким именем уже существует')
		}
	}
}
