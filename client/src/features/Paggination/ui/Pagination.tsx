import { Dispatch, FC, SetStateAction } from 'react'
import { Pagination as PaginationAntd } from 'antd'

/**
 * The type `TPaginationProps` defines props for pagination in a TypeScript React component.
 * @property {number} page - The `page` property represents the current page number in a paginated
 * list.
 * @property {number} limit - The `limit` property in the `TPaginationProps` type represents the
 * maximum number of items that can be displayed on a single page in a pagination component. It
 * determines how many items are shown per page before the pagination controls are used to navigate to
 * the next or previous page.
 * @property {number} total - The `total` property in the `TPaginationProps` type represents the total
 * number of items in the dataset that is being paginated. This value is used to calculate the total
 * number of pages based on the `limit` of items per page.
 * @property setPage - The `setPage` property is a function that allows you to update the current page
 * number in a paginated component. It typically takes a new page number as an argument and updates the
 * state to reflect the new page being displayed.
 */
type TPaginationProps = {
	limit: number
	total: number
	page: number
	setPage: Dispatch<SetStateAction<number>>
}

/* The component renders an Ant Design Pagination component (`PaginationAntd`)
with specific configurations based on the props passed to it. */
const Pagination: FC<TPaginationProps> = ({ page, limit, total, setPage }) =>
	<PaginationAntd
		defaultCurrent={1}
		total={total}
		pageSize={limit}
		current={page}
		showSizeChanger
		showQuickJumper
		hideOnSinglePage
		showTotal={(total) => `Total ${total} items`}
		onChange={(page, pageSize) => {
			setPage(page)
		}}
	/>

export default Pagination
