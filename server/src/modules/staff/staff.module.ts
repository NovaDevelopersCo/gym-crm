import { Module } from '@nestjs/common'
import { StaffService } from './staff.service'
import { StaffController } from './staff.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StaffEntity } from '@/modules/staff/entities'

@Module({
	imports: [TypeOrmModule.forFeature([StaffEntity])],
	providers: [StaffService],
	controllers: [StaffController],
	exports: [StaffService]
})
export class StaffModule {}
