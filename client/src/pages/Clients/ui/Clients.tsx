import { useAppSelector } from '@/store'

import { ClientsFilter } from '@widgets/ClientsFilter'
import { ListOfClients } from '@widgets/ListOfClients'

import { AddClientBtn } from '@features/Client'

const ClientsPage = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	return (
		<>
			<ClientsFilter />
			{user.role != 'trainer' && <AddClientBtn />}
			<ListOfClients />
		</>
	)
}

export default ClientsPage
