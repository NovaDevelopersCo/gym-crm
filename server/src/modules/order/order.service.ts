import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity, OrderItemEntity } from './entities'
import { Repository } from 'typeorm'
import { ProductService } from '../product/product.service'
import { UserService } from '../user/user.service'
import { FindAllOrderDto } from './dto/find-all.dto'
import { Pagination } from '@/core/pagination'
import { ProductEntity } from '../product/entities'
import { skipCount } from '@/core/utils'

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderEntity)
		private readonly orderRepository: Repository<OrderEntity>,
		@InjectRepository(OrderItemEntity)
		private readonly orderItemRepository: Repository<OrderItemEntity>,
		private readonly productService: ProductService,
		private readonly userService: UserService
	) {}

	async create(dto: CreateOrderDto) {
		const user = await this.userService.getOneById(dto.user)
		const productIds = dto.products.map(prod => prod.id)
		const products = await this.productService.getByIds(productIds)
		this.checkAllProductInClub(products, user.club.id)
		let total = 0
		const orderItems = dto.products.map(product => {
			const { price } = products.find(p => p.id === product.id)
			const count = product.count
			total += count * price
			return this.orderItemRepository.create({
				count,
				price,
				product: { id: product.id }
			})
		})
		await this.orderItemRepository.save(orderItems)
		const order = this.orderRepository.create({
			items: orderItems,
			total,
			user: { id: dto.user }
		})
		return await this.orderRepository.save(order)
	}

	async getAll({ page, count, sortBy, sortOrder, user }: FindAllOrderDto) {
		const where = {}
		if (user) {
			where['user'] = { id: user }
		}

		const [items, total] = await this.orderRepository.findAndCount({
			order: {
				[sortBy]: sortOrder
			},

			where,
			take: count,
			skip: skipCount(page, count),
			relations: {
				user: true,
				items: {
					product: true
				}
			},
			select: {
				user: {
					id: true,
					fio: true,
					email: true
				}
			}
		})

		return new Pagination(items, total)
	}

	async getById(id: number) {
		const order = await this.orderRepository.findOne({
			where: { id },
			relations: {
				items: {
					product: true
				},
				user: true
			},
			select: {
				user: {
					id: true,
					fio: true,
					email: true
				}
			}
		})

		if (!order) {
			throw new NotFoundException(`Заказ с id: ${id} не найден`)
		}
		return order
	}

	async delete(id: number) {
		await this.getById(id)
		await this.orderRepository.delete({ id })
		return
	}

	private checkAllProductInClub(products: ProductEntity[], clubId: number) {
		products.forEach(product => {
			// ! Если клуб null
			if (!product.club) return
			if (product.club.id !== clubId) {
				throw new BadRequestException(
					`Товара с id: ${product.id} нет в клубе с id: ${clubId}`
				)
			}
		})
	}
}
