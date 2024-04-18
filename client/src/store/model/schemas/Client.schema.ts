import { EStuffRoles, IArea, IGroup, IStuff } from '.'

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

	directions: IArea[]
	trainer: Omit<IStuff, 'role'> &
		{
			role: EStuffRoles.TRAINER
		}[]

	sex: 'male' | 'female'
}
