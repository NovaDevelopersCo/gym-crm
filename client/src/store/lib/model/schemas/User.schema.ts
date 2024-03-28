export enum EUserRoles {
	DIRECTOR = 'director',
	TRAINER = 'trainer',
	ADMIN = 'admin'
}

export default interface IUser {
	name: string
	email: string
	id: number
	role: EUserRoles
}