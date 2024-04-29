import { IClub } from './'

export default interface CreateClubDto
	extends Pick<IClub, 'name' | 'address' | 'admins'> {}
