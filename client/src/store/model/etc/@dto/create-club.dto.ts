import { IClub } from '@store/index'

export default interface CreateClubDto extends Pick<IClub, 'name' | 'admin' | 'address'> {}
