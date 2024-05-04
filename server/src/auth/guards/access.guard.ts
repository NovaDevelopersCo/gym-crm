import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export const AccessGuard = () => UseGuards(AuthGuard('ACCESS_JWT_STRATEGY'))
