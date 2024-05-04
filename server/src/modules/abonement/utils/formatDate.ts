export const formatDate = (duration: string) => {
	const count = duration.slice(0, -2)
	const prefix = duration.slice(count.length)

	return {
		count: +count,
		prefix
	}
}
