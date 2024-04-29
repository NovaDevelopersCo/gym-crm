import { IStaff } from '../staff'

type RefreshResponse = {
	profile: IStaff | null
	accessToken: string
}

export default RefreshResponse
