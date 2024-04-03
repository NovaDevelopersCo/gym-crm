import { BadRequestException, Injectable } from '@nestjs/common'
import { PaginationUserQueryDto, QuestionnaireUserDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	async createQuestionnaireUser({ email, phone, cardNumber, ...dto }: QuestionnaireUserDto) {
		const oldUser = await this.userRepository.findOne({
			where: [{ email }, { phone }, { cardNumber }]
		})

		if (oldUser) {
			const messages = []
			const msg = (field: string) => `Данный ${field} уже используется другим пользователем`

			if (oldUser.email === email) messages.push(msg('Email'))

			if (Number(oldUser.phone) === phone) messages.push(msg('Номер телефона'))

			if (Number(oldUser.cardNumber) === cardNumber) messages.push(msg('Номер карты'))

			throw new BadRequestException(messages)
		}

		// ? check club and groups

		// ! beta
		const createdUser = this.userRepository.create({ email, phone, cardNumber, ...dto })
		const savedUser = await this.userRepository.save(createdUser)
		return {
			id: savedUser.id,
			email: savedUser.email,
			phone: savedUser.phone,
			fio: savedUser.fio
		}
	}

	async findAll(query: PaginationUserQueryDto) {
		console.log(query)
	}
}
