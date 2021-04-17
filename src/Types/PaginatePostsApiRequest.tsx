export default interface PaginatePostsApiRequest{
    per_page?: number,
    page_number?: number,
    sort_field?: string,
    sort_type?: string
}