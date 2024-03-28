//eslint-disable-next-line
import clientsData from '../../../data/clients.data.json'
import { More } from './@More/More'
import cl from './ListOfClients.module.scss'

export const ListOfClients = () => {
	return (
		<div className={cl.root}>
			{clientsData.map(client => (
				<ul key={client.id} className={cl.root__list}>
					<li className={cl.root__list_listItem}>
						<More />
					</li>
					<li className={cl.root__list_listItem}>
						<img
							className={cl.root__list_listItem_item}
							src='/user.png'
							alt='user'
						/>
					</li>
					<li className={cl.root__list_listItem}>
						<span className={cl.root__list_listItem_item}>
							{client.last_name}
						</span>
						<span className={cl.root__list_listItem_item}>
							{client.first_name}
						</span>
					</li>
					<li className={cl.root__list_listItem}>{client.address}</li>
					<li className={cl.root__list_listItem}>
						{client.register_date}
					</li>
					<li className={cl.root__list_listItem}>
						<span className={cl.root__list_listItem_item}>
							<img
								className={cl.root__list_listItem_item_status}
								src='/positive.svg'
								alt='positive'
							/>
							<span>Пробное посещение:</span>
						</span>
						<span className={cl.root__list_listItem_item_opacity}>
							{client.trial_visit}
						</span>
					</li>
					<li className={cl.root__list_listItem}>{client.role}</li>
				</ul>
			))}
		</div>
	)
}
