import { IClub } from '../club'
import { EStaffRoles } from './'

export default interface IStaff {
	id: string
	email: string
	lastActivity: string
	role: EStaffRoles
	club: IClub['id']
}
