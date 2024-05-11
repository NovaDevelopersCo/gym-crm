import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CommonPropertiesSwagger } from '@/core/swagger'

export abstract class BaseEntity {
	@CommonPropertiesSwagger.id()
	@PrimaryGeneratedColumn()
	public readonly id: number

	@CommonPropertiesSwagger.createDate()
	@CreateDateColumn()
	public readonly createDate: Date

	@CommonPropertiesSwagger.updateDate()
	@UpdateDateColumn()
	public readonly updateDate: Date
}
