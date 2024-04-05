import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Exclude } from 'class-transformer'

export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Exclude()
	@CreateDateColumn()
	createDate: Date

	@Exclude()
	@UpdateDateColumn()
	updateDate: Date
}
