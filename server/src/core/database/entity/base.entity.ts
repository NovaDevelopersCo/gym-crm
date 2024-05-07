import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export abstract class BaseEntity {
	@ApiProperty({
		example: 1,
		description: 'Id сущности'
	})
	@PrimaryGeneratedColumn()
	id: number

	@Exclude()
	@CreateDateColumn()
	createDate: Date

	@Exclude()
	@UpdateDateColumn()
	updateDate: Date
}
