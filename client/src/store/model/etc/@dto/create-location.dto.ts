import { ILocation } from '@store/index'

export default interface CreateLocationDto extends Pick<ILocation, 'name'> {}
