import { IClient } from '../client'

export enum EAbonementStatus {
	EXPIRES = 'expires',
	EXPIRED = 'expired',
	BOUGHT = 'bought',
	NOT_BUY = 'not_buy'
}

export default interface IAbonement {
	user: IClient
	status: EAbonementStatus
}
