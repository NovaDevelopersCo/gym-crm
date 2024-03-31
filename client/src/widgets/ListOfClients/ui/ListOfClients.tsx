import { ClientItem } from './@ClientItem/ClientItem'
import cl from './ListOfClients.module.scss'
import { TableHeader } from './@TableHeader/TableHeader'

export const ListOfClients = () => {
	return (
		<div className={cl.root}>
			<TableHeader>
				<ClientItem />
			</TableHeader>
		</div>
	)
}
