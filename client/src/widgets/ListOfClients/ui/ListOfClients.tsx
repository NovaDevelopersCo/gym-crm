import { ClientItem } from './ClientItem'
import cl from './ListOfClients.module.scss'
import { TableHeader } from './TableHeader/ui/TableHeader'

export const ListOfClients = () => {
	return (
		<div className={cl.root}>
			<TableHeader>
				<ClientItem />
			</TableHeader>
		</div>
	)
}
