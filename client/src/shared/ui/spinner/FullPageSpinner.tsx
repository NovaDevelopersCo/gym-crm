import styles from './FullPageSpinner.module.scss'
import Spinner from './Spinner'

const FullPageSpinner = () => {
	return (
		<div className={styles.root}>
			<Spinner />
		</div>
	)
}

export default FullPageSpinner
