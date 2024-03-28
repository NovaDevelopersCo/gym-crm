export enum EClientStatus {
	member = 'CLUB_MEMBER',
	exMember = 'EX_CLUB_MEMBER'
}

export default interface IClient {
	id: string
	registrationDate: string
	fullName: string
	phone: number
	email: string
	cardNumber: number
	segment: string
	status?: EClientStatus
	birthDate: string
	sex: 'male' | 'female'
	adsProvider: string
	regMethod: string
}
