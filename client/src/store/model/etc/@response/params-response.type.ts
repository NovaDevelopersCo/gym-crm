type TParamsResponse<T> = {
	items: T[],
	meta: {
		total?: number
	}
}

export default TParamsResponse