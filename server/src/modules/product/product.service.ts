import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto, UpdateProductDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './entities'
import { Between, ILike, In, Repository } from 'typeorm'
import { FindAllProductDto } from './dto/find-all.dto'
import { Pagination } from '@/core/pagination'
import { ClubService } from '../club/club.service'
import { skipCount } from '@/core/utils'

// TODO: продумать логику
@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
		private readonly clubService: ClubService
	) {}

	public async create(dto: CreateProductDto) {
		const product = this.productRepository.create({
			...dto,
			club: {
				id: dto.club
			}
		})
		return await this.productRepository.save(product)
	}

	public async getAll({
		page,
		count,
		sortBy,
		sortOrder,
		name,
		users,
		clubs,
		price
	}: FindAllProductDto) {
		const where = {}
		name ? (where['name'] = ILike(`%${name}%`)) : {}
		users?.length ? (where['users'] = { id: In(users) }) : {}
		clubs?.length ? (where['club'] = { id: In(clubs) }) : {}
		if (price) {
			if (typeof price === 'number') {
				where['price'] = price
			}
			if (Array.isArray(price)) {
				const sorted = price.sort()
				where['price'] = Between(sorted[0], sorted[1])
			}
		}
		const [items, total] = await this.productRepository.findAndCount({
			where,
			order: {
				[sortBy]: sortOrder
			},
			take: count,
			skip: skipCount(page, count),
			relations: {
				club: true
			}
		})

		return new Pagination(items, total)
	}

	public async getById(id: number) {
		const product = await this.productRepository.findOne({
			where: { id },
			relations: {
				club: true
			}
		})

		if (!product) {
			throw new NotFoundException(`Продукт с id: ${id} не найден`)
		}

		return product
	}

	public async update(id: number, dto: UpdateProductDto) {
		const product = await this.getById(id)
		await this.clubService.getById(dto.club)
		// eslint-disable-next-line
		const { createDate, updateDate, ...data } = await this.productRepository.save({
			...product,
			...dto,
			club: { id: dto.club }
		})
		return data
	}

	public async delete(id: number) {
		await this.getById(id)
		await this.productRepository.delete({ id })
		return
	}

	public async getByIds(ids: number[]) {
		const products = await this.productRepository.find({
			where: { id: In(ids) },
			relations: {
				club: true
			}
		})

		const errorMessages = []

		ids.map(id => {
			const product = products.some(g => g.id === id)
			if (!product) {
				errorMessages.push(`Товар с id: ${id} не найден`)
			}
		})

		if (errorMessages.length) {
			throw new BadRequestException(errorMessages)
		}

		return products
	}
}
