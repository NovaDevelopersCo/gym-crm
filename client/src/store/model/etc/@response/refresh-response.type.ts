import { IUser } from '@store/index'

type TRefreshResponse = {
	profile: IUser | null
	accessToken: string
}

export default TRefreshResponse
