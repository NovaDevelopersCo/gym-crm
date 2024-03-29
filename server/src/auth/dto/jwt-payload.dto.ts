import { PickType } from '@nestjs/swagger'

import { StaffEntity } from '@/modules/staff/entities'

export class JwtPayload extends PickType(StaffEntity, ['email', 'id', 'role']) {}
