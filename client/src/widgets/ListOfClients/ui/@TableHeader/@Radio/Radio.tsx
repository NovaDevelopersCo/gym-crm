import cl from './Radio.module.scss'

export const Radio = ({
	handleUp,
	sortUp,
	handleDown,
	sortDown
}: {
	handleUp: () => void
	sortUp: boolean
	handleDown: () => void
	sortDown: boolean
}) => {
	return (
		<div className={cl.root}>
			<label className={cl.root__label}>
				<input
					onChange={handleUp}
					type='radio'
					name='filter'
					className={cl.root__label_radio}
				/>
				<svg
					className={
						sortUp
							? `${cl.root__label_fakeRadio} ${cl.root__label_fakeRadio_rotate} ${cl.root__label_fakeRadio_active}`
							: `${cl.root__label_fakeRadio} ${cl.root__label_fakeRadio_rotate}`
					}
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M5.37796 5.56356C5.17858 5.7938 4.82142 5.7938 4.62204 5.56356L0.520334 0.827327C0.239896 0.503505 0.469923 0 0.898299 0L9.1017 0C9.53008 0 9.7601 0.503505 9.47967 0.827327L5.37796 5.56356Z' />
				</svg>
			</label>
			<label className={cl.root__label}>
				<input
					onChange={handleDown}
					type='radio'
					name='filter'
					className={cl.root__label_radio}
				/>
				<svg
					className={
						sortDown
							? `${cl.root__label_fakeRadio} ${cl.root__label_fakeRadio_active}`
							: `${cl.root__label_fakeRadio}`
					}
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M5.37796 5.56356C5.17858 5.7938 4.82142 5.7938 4.62204 5.56356L0.520334 0.827327C0.239896 0.503505 0.469923 0 0.898299 0L9.1017 0C9.53008 0 9.7601 0.503505 9.47967 0.827327L5.37796 5.56356Z' />
				</svg>
			</label>
		</div>
	)
}
