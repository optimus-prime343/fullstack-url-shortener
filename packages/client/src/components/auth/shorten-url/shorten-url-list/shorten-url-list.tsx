import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { Show } from 'solid-js'
import { createSignal } from 'solid-js'
import { For } from 'solid-js'
import toast from 'solid-toast'

import { useShortenURL } from '../../../../context/shorten-url'
import type { ShortenedURL } from '../../../../types/shortened-url'
import { AppPagination } from '../../../ui/app-pagination'
import { ShortenURLItem } from '../shorten-url-item'

export interface ShortenURListProps {
  shortenedURLs: ShortenedURL[]
}

const ITEMS_PER_PAGE = 10
export const ShortenURList: Component<ShortenURListProps> = props => {
  const { totalInDB, fetchShortenedURLs } = useShortenURL()
  const [page, setPage] = createSignal<number>(1)

  const totalPaginationButtons = createMemo(() =>
    Math.ceil(totalInDB() / ITEMS_PER_PAGE)
  )
  const handlePageChange = async (newPage: number) => {
    try {
      await fetchShortenedURLs(newPage, true)
      setPage(newPage)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div>
      <Show when={totalPaginationButtons() > 1}>
        <AppPagination
          page={page()}
          total={totalPaginationButtons()}
          onChange={handlePageChange}
        />
      </Show>
      <div class='mt-4 space-y-2 lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0'>
        <For each={props.shortenedURLs}>
          {shortenedURL => <ShortenURLItem shortenURL={shortenedURL} />}
        </For>
      </div>
    </div>
  )
}
