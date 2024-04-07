import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import type { DataSource, QueryRunner } from 'typeorm'

@Injectable()
export class DataBaseService {
	constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
	// eslint-disable-next-line
	async transaction<T>(callback: (queryRunner: QueryRunner) => T) {
		const queryRunner = this.dataSource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()
		try {
			const resultCb = await callback(queryRunner)
			await queryRunner.commitTransaction()
			return resultCb
		} catch (e) {
			await queryRunner.rollbackTransaction()
			return null
		} finally {
			await queryRunner.release()
		}
	}
}
