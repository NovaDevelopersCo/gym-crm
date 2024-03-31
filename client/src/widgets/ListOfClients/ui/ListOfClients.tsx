import { ClientItem } from './@ClientItem/ClientItem'
import { TableHeader } from './@TableHeader/TableHeader'
import cl from './ListOfClients.module.scss'

export const ListOfClients = () => {
	return (
		<div className={cl.root}>
			<TableHeader>
				<ClientItem />
			</TableHeader>
		</div>
	)
}
