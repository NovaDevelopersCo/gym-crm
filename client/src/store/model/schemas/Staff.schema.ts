export enum EStaffRoles {
	DIRECTOR = 'director',
	ADMIN = 'admin',
	TRAINER = 'trainer'
}

export default interface IStaff {
	id: number
	fio: string
	email: string
	role: EStaffRoles
}
