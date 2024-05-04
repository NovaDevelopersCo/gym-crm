import { IoAdapter } from '@nestjs/platform-socket.io'
import type { NextFunction } from 'express'
import { ClientIo } from '@/ws/dto'
import { INestApplication } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { TokenService } from '@/auth/token.service'

export class AuthAdapter extends IoAdapter {
	tokenService: TokenService

	constructor(private readonly app: INestApplication) {
		super(app)
		this.tokenService = app.get(TokenService)
	}

	createIOServer(port: number, options?: any) {
		const server = super.createIOServer(port, options)
		server.use(async (socket: ClientIo, next: NextFunction) => {
			try {
				const tokenBody = socket.handshake.headers.authorization

				if (!tokenBody) {
					throw new WsException('Unauthorized')
				}

				const token = tokenBody.split(' ')[1]

				if (!token) {
					throw new WsException('Unauthorized')
				}

				const user = await this.tokenService.validateAccessToken(token)

				socket.user = user

				next()
			} catch (e) {
				next(e)
			}
		})

		return server
	}
}
