export enum EUserRoles {
	DIRECTOR = 'director',
	ADMIN = 'admin',
	TRAINER = 'trainer'
}

export default interface IUser {
	id: number
	name: string
	email: string
	role: EUserRoles
}
