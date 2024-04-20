import { IClient } from '.'
import IArea from './Area.schema'
import IStaff, { EStaffRoles } from './Staff.schema'

export default interface IGroup {
	id: string
	name: string
	users: IClient[]
	trainer: Omit<IStaff, 'role'> & {
		role: EStaffRoles.TRAINER
	}
	area_id: IArea['id']
}
