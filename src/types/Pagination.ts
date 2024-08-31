export interface PageRequest<T> {
  pageIndex?: number
  pageSize?: number
  filter?: T
}

export interface PageResponse<T> {
  data: T
  pageIndex: number
  total: number
}
