import { IStaff } from '@/store'

type TRefreshResponse = {
	profile: IStaff | null
	accessToken: string
}

export default TRefreshResponse
