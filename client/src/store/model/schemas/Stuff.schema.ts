export enum EStuffRoles {
	DIRECTOR = 'director',
	ADMIN = 'admin',
	TRAINER = 'trainer'
}

export default interface IStuff {
	id: number
	name: string
	email: string
	role: EStuffRoles
}
