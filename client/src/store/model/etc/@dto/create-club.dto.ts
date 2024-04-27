import { IClub } from '@/store'

export default interface CreateClubDto extends Pick<IClub, 'name'> {}
