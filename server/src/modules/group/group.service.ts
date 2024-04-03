import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GroupEntity } from './entities'
import { Repository } from 'typeorm'
import { CreateGroupDto, UpdateGroupDto } from './dto'
import { StaffService } from '../staff/staff.service'
import { ClubService } from '../club/club.service'
import { DirectionService } from '../direction/direction.service'

@Injectable()
export class GroupService {
	constructor(
		@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
		private readonly staffService: StaffService,
		private readonly clubService: ClubService,
		private readonly directionService: DirectionService
	) {}

	async getAll() {
		const groups = await this.groupRepository.find()

		const formattedGroups = groups.map(i => {
			const { name, id, club, direction, trainer } = i
			return { name, id, club, direction, trainer }
		})

		return { groups: formattedGroups }
	}

	async getById(groupId: number) {
		const group = await this.groupRepository.findOne({ where: { id: groupId } })

		if (!group) {
			throw new BadRequestException(`Группы с id: ${groupId} не найдено`)
		}

		const { id, name, direction, club, trainer, users } = group

		return { id, name, direction, club, trainer, users }
	}

	async create(dto: CreateGroupDto) {
		const group = await this.groupRepository.findOne({ where: { name: dto.name } })

		if (group) {
			throw new BadRequestException('Группа с таким именем уже существует')
		}

		const trainer = await this.staffService.byId(dto.trainer)

		if (!trainer) {
			throw new BadRequestException(`Профиль тренера с id: ${dto.trainer} не найден`)
		}

		if (trainer.role !== 'trainer') {
			throw new BadRequestException(`Профиль с id: ${dto.trainer} не является тренером`)
		}

		await this.clubService.getById(dto.club)
		await this.directionService.getById(dto.direction)

		const newGroup = this.groupRepository.create({
			name: dto.name,
			direction: { id: dto.direction },
			club: { id: dto.club },
			trainer: { id: trainer.id }
		})

		const savedGroup = await this.groupRepository.save(newGroup)

		const { name, direction, trainer: trainerBody, club, id } = savedGroup

		return { name, direction, trainer: trainerBody, club, id }
	}

	async update(groupId: number, dto: UpdateGroupDto) {
		const group = await this.groupRepository.findOne({ where: { id: groupId } })

		if (!group) {
			throw new BadRequestException(`Группа с id: ${groupId} не найдена`)
		}

		const newNameCheck = await this.groupRepository.findOne({ where: { name: dto.name } })

		if (newNameCheck) {
			throw new BadRequestException('Группа с таким именем уже существует')
		}

		await this.clubService.getById(dto.club)
		await this.staffService.byId(dto.trainer)
		await this.directionService.getById(dto.direction)

		const savedGroup = await this.groupRepository.save({
			...group,
			...dto,
			direction: { id: dto.direction },
			trainer: { id: dto.trainer },
			club: { id: dto.club }
		})

		const { trainer, club, name, id, users, direction } = savedGroup

		return { trainer, club, name, id, users, direction }
	}

	async delete(id: number) {
		const group = await this.groupRepository.findOne({ where: { id } })

		if (!group) {
			throw new BadRequestException(`Группа с id: ${id} не найдена`)
		}

		const deleteResult = await this.groupRepository.delete({ id })

		return { message: deleteResult.affected > 0 }
	}
}
