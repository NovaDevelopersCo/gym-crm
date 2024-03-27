import { IUser } from "../.."

type TRegistrationResponse = {
	user: IUser | null
	accessToken: string | null
}

export default TRegistrationResponse
