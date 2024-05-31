import { IClub } from '../club'
import IAbonement from './abonement.schema'

export default interface CreateAbonementDto
	extends Omit<IAbonement, 'id' | 'createDate' | 'updateDate'> {
	clubs: IClub[]
}
