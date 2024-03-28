import { ExecutionContext, createParamDecorator } from '@nestjs/common'

import { Request } from 'express'

export const User = createParamDecorator((ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest() as Request
	const user = req.user

	return user || null
})
