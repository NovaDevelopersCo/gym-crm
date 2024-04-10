import { IDirection } from '@store/model'

export default interface CreateDirectionDto extends Pick<IDirection, 'name'> {}
