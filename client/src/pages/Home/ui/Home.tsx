import { useAppSelector } from "@store/lib"
import { useEffect } from "react"

const Home = () => {
	const role = useAppSelector(store => store["auth/slice"].user.role)
	return <div>
		<h1>Your role {role}</h1>
	</div>
}

export default Home
