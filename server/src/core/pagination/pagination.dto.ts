export class Pagination {
	private readonly items: object[]
	private readonly meta: { total: number }
	constructor(items: object[], totalCount: number) {
		this.items = items
		this.meta = {
			total: totalCount
		}
	}
}
