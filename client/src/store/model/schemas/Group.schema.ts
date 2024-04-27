import { EStaffRoles, IClient, IDirection, IStaff } from '.'

export default interface IGroup {
	id: string
	name: string
	users: IClient[]
	trainer: Omit<IStaff, 'role'> & {
		role: EStaffRoles.TRAINER
	}
	direction_id: IDirection['id']
}
