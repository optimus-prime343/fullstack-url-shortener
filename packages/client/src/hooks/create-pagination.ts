import { createSignal } from 'solid-js'

export interface CreatePaginationOptions {
  total: number
}
export interface CreatePaginationSignal {
  range: number[]
  currentPage: () => number
  setPage: (page: number) => void
  next: () => void
  previous: () => void
  last: () => void
  first: () => void
}
export const createPagination = (
  options: CreatePaginationOptions
): CreatePaginationSignal => {
  const [page, setPage] = createSignal<number>(1)

  const getRange = (): number[] => {
    const range = Array.from({ length: options.total })
      .map((_, index) => index + 1)
      .reduce<number[]>((acc, curr) => {
        if (curr > options.total) return acc
        acc.push(curr)
        return acc
      }, [])
    return range
  }
  const currentPage = () => page()
  const next = () => {
    if (page() >= options.total) return
    setPage(page() + 1)
  }
  const previous = () => {
    if (page() <= 1) return
    setPage(page() - 1)
  }
  const first = () => setPage(1)
  const last = () => setPage(options.total)
  return {
    range: getRange(),
    setPage,
    next,
    previous,
    last,
    first,
    currentPage
  }
}
