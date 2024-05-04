export class Pagination {
	items: object[]
	meta: { total: number }
	constructor(items: object[], totalCount: number) {
		this.items = items
		this.meta = {
			total: totalCount
		}
	}
}
