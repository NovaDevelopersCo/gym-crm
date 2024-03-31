//eslint-disable-next-line
import clientsData from '@/data/clients.data.json'
import { More } from './@more/More'
import cl from './ClientItem.module.scss'

export const ClientItem = () => {
	return (
		<div className={cl.root}>
			{clientsData.map(client => (
				<ul key={client.id} className={cl.root__primaryList}>
					{/*  */}
					<li className={cl.root__primaryList_primaryItem}>
						<More />
						<img
							className={cl.root__primaryList_primaryItem_userPng}
							src='/user.png'
							alt='user'
						/>
					</li>
					{/*  */}
					<ul
						className={`${cl.root__primaryList__secondaryList} ${cl.scrollbar_disable}`}
					>
						<li
							className={
								cl.root__primaryList__secondaryList_secondaryItem
							}
						>
							<span>{client.last_name}</span>
							<span>{client.first_name}</span>
						</li>
						<li
							className={
								cl.root__primaryList__secondaryList_secondaryItem
							}
						>
							{client.address}
						</li>
						<li
							className={
								cl.root__primaryList__secondaryList_secondaryItem
							}
						>
							{client.register_date}
						</li>
						<li
							className={
								cl.root__primaryList__secondaryList_secondaryItem
							}
						>
							<span
								className={
									cl.root__primaryList__secondaryList_secondaryItem_item
								}
							>
								<img
									className={
										cl.root__primaryList__secondaryList_secondaryItem_item_status
									}
									src='/positive.svg'
									alt='positive'
								/>
								<span>Пробное посещение:</span>
							</span>
							<span>{client.trial_visit}</span>
						</li>
						<li
							className={
								cl.root__primaryList__secondaryList_secondaryItem
							}
						>
							{client.role}
						</li>
					</ul>
				</ul>
			))}
		</div>
	)
}
