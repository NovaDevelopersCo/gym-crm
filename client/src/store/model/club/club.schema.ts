import { IClient } from '../client'
import { IGroup } from '../group'
import { IStaff } from '../staff'

export default interface IClub {
	id: string
	address: string
	name: string
	admins: IStaff[]
	groups: IGroup[]
	users: IClient[]
}
