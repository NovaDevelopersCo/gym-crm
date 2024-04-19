import { IClient } from '.'
import IGroup from './Group.schema'
import IStaff from './Staff.schema'

export default interface ILocation {
	id: string
	address: string
	name: string
	users: IClient[]
	groups: IGroup[]
	admin_id: IStaff['id']
}
