import { IAbonement } from '../abonement'
import { IClub } from '../club'

export default interface CreateAbonementDto
	extends Omit<IAbonement, 'id' | 'createDate' | 'updateDate'> {
	clubs: IClub[]
}
