import { IClient } from '../client'
import IAbonement from './abonement.schema'

export default interface BuyAbonementResponse
	extends Pick<IAbonement, 'count' | 'createDate' | 'updateDate' | 'price'> {
	id: number
	start: string
	end: string
	isFinish: boolean
	abonement: IAbonement['id']
	user: IClient['id']
}
