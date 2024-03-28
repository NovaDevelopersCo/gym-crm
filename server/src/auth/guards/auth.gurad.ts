import { UseGuards } from '@nestjs/common'

import { AuthGuard as AGuard } from '@nestjs/passport'

export const AuthGuard = () => UseGuards(AGuard('ACCESS_JWT_STRATEGY'))
