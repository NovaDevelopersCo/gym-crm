import { IAbonement } from '../abonement'
import { IClient } from '../client'

export default interface BuyAbonementDto {
	abonementId: IAbonement['id']
	userId: IClient['id']
}
