type GetItemsResponse<T> = {
	items: T[]
	meta: {
		total: number
	}
}

export default GetItemsResponse
