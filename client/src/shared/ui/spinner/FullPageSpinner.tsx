import Spinner from './Spinner'

import styles from './FullPageSpinner.module.scss'

const FullPageSpinner = () => {
	return (
		<div className={styles.root}>
			<Spinner />
		</div>
	)
}

export default FullPageSpinner