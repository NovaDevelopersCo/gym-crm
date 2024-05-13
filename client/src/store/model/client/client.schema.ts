import { IClub } from '../club'
import { IGroup } from '../group'

export default interface IClient {
	id: string

	email: string

	phone: string
	fio: string
	birthday?: string
	howKnow?: string
	instagram: string | null
	groups: IGroup[]
	club: IClub
	[key: string]: unknown
}
