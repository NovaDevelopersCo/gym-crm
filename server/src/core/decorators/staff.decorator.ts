import { JwtPayload } from '@auth/dto'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'

import { Request } from 'express'

export const Staff = createParamDecorator((key: keyof JwtPayload, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest() as Request
	const user = req.user

	return key ? user[key] : user
})
