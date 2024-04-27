import { IDirection, IGroup } from '.'

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
	status: EClientStatus
	segment: string
	fio: string
	birthday?: string
	dateRegistration: string
	payed: boolean
	howKnow?: string

	advertisingSource: string
	registrationMethod: string
	experienceBefore: string

	club: string | number

	groups: IGroup[]
	instagram?: string

	directions: IDirection[]
	sex: 'male' | 'female'
}
