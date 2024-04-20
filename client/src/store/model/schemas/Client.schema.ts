import { EStaffRoles, IDirection, IGroup, IStaff } from '.'

export enum EClientStatus {
	member = 'CLUB_MEMBER',
	exMember = 'EX_CLUB_MEMBER'
}

export default interface IClient {
	[key: string]: unknown
	id: string
	email: string
	phone: number
	cardNumber: number
	status?: EClientStatus
	segment: string
	name: string
	surname: string
	birthday: string
	dateRegistration: string
	payed: boolean

	advertisingSource: string
	registrationMethod: string
	experienceBefore: string

	club: string | number

	groups: IGroup[]

	directions: IDirection[]
	trainer: Omit<IStaff, 'role'> &
		{
			role: EStaffRoles.TRAINER
		}[]

	sex: 'male' | 'female'
}
