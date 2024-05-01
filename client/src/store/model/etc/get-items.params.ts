import ESortOrder from "./sort-order.enum"

interface GetItemsParams<T = unknown> {
	page?: number
	count?: number
	sortOrder?: ESortOrder
	sortBy?: keyof T
	searchBy?: keyof T
}

export default GetItemsParams