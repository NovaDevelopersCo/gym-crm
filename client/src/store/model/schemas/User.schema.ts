export enum EUserRoles {
	DIRECTOR = 'director',
	TRAINER = 'trainer',
	ADMIN = 'admin'
}

export default interface IUser {
	id: number
	name: string
	email: string
	role: EUserRoles
}
