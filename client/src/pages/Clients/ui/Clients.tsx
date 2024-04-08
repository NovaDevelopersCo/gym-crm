import { useAppSelector } from '@store/index'

import { NewClient } from '@widgets/Client'
import { ClientsFilter } from '@widgets/ClientsFilter'
import { ListOfClients } from '@widgets/ListOfClients'

const ClientsPage = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	return (
		<>
			<ClientsFilter />
			{user.role != 'trainer' && <NewClient />}
			<ListOfClients />
		</>
	)
}

export default ClientsPage
