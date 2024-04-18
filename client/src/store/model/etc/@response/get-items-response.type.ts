type TGetItemsResponse<T> = {
	items: T[]
	meta: {
		total: number
	}
}

export default TGetItemsResponse
