import { Module } from '@nestjs/common'

import { StaffService } from './staff.service'

import { TypeOrmModule } from '@nestjs/typeorm'
import { StaffEntity } from '@/auth/entities'

@Module({
	imports: [TypeOrmModule.forFeature([StaffEntity])],
	providers: [StaffService],
	exports: []
})
export class StaffMoule {}
