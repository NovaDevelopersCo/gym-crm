import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export abstract class BaseEntity {
	@ApiProperty({
		example: 1,
		description: 'Id сущности'
	})
	@PrimaryGeneratedColumn()
	public readonly id: number

	@Exclude()
	@CreateDateColumn()
	public readonly createDate: Date

	@Exclude()
	@UpdateDateColumn()
	public readonly updateDate: Date
}
