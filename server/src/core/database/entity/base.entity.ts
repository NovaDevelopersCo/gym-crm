import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { CommonPropertiesSwagger } from '@/core/swagger'

export abstract class BaseEntity {
	@CommonPropertiesSwagger.id()
	@PrimaryGeneratedColumn()
	public readonly id: number

	@Exclude()
	@CreateDateColumn()
	public readonly createDate: Date

	@Exclude()
	@UpdateDateColumn()
	public readonly updateDate: Date
}
