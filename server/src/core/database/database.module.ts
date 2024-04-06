import { Module } from '@nestjs/common'

import { DataBaseService } from './database.service'

@Module({
	imports: [],
	exports: [DataBaseService],
	providers: [DataBaseService]
})
export class DataBaseModule {}
