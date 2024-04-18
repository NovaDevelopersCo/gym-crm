import { ILocation } from '@/store'

export default interface CreateLocationDto extends Pick<ILocation, 'name'> {}
