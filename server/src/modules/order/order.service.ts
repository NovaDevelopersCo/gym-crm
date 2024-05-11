import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity, OrderItemEntity } from './entities'
import { Between, In, Repository } from 'typeorm'
import { ProductService } from '../product/product.service'
import { UserService } from '../user/user.service'
import { FindAllOrderDto } from './dto/find-all.dto'
import { Pagination } from '@/core/pagination'
import { ProductEntity } from '../product/entities'
import { skipCount } from '@/core/utils'
import { returnSelectUser } from '../user/dto'

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

	public async create(dto: CreateOrderDto) {
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

	public async getAll({ page, count, sortBy, sortOrder, users, total }: FindAllOrderDto) {
		const where = {}
		users?.length ? (where['user'] = { id: In(users) }) : {}

		if (total) {
			if (typeof total === 'number') {
				where['total'] = total
			}
			if (Array.isArray(total)) {
				const sorted = total.sort()
				where['total'] = Between(sorted[0], sorted[1])
			}
		}
		const [items, total_] = await this.orderRepository.findAndCount({
			where,
			order: {
				[sortBy]: sortOrder
			},
			take: count,
			skip: skipCount(page, count),
			relations: {
				user: true,
				items: {
					product: true
				}
			},
			select: {
				user: returnSelectUser
			}
		})

		return new Pagination(items, total_)
	}

	public async getById(id: number) {
		const order = await this.orderRepository.findOne({
			where: { id },
			relations: {
				items: {
					product: true
				},
				user: true
			},
			select: {
				user: returnSelectUser
			}
		})

		if (!order) {
			throw new NotFoundException(`Заказ с id: ${id} не найден`)
		}
		return order
	}

	public async delete(id: number) {
		await this.getById(id)
		await this.orderRepository.delete({ id })
		return
	}

	private checkAllProductInClub(products: ProductEntity[], clubId: number) {
		products.forEach(product => {
			if (!product.club) return
			if (product.club.id !== clubId) {
				throw new BadRequestException(
					`Товара с id: ${product.id} нет в клубе с id: ${clubId}`
				)
			}
		})
	}
}
