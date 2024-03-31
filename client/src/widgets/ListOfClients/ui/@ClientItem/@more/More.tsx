import cl from './More.module.scss'

export const More = () => {
	return (
		<svg
			width='8'
			height='18'
			viewBox='0 0 8 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={cl.root}
		>
			<circle className={cl.root__circle} cx='2' cy='2' r='2' />
			<circle className={cl.root__circle} cx='2' cy='7' r='2' />
			<circle className={cl.root__circle} cx='2' cy='12' r='2' />
		</svg>
	)
}
