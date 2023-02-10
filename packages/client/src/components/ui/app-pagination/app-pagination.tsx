import { cva } from 'class-variance-authority'
import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { For } from 'solid-js'

export interface AppPaginationProps {
  total: number
  page: number
  onChange: (page: number) => void
}
const paginationItem = cva(
  'px-4 py-1.5 rounded-md cursor-pointer border-2 border-transparent disabled:opacity-25',
  {
    variants: {
      intent: {
        active: 'bg-primary-700 hover:bg-primary-600',
        inActive: 'border-primary-700 text-primary-700 hover:border-primary-600'
      }
    }
  }
)
export const AppPagination: Component<AppPaginationProps> = props => {
  const range = createMemo(() => {
    const reduceCallback = (acc: number[], curr: number): number[] => {
      if (curr > props.total) return acc
      acc.push(curr)
      return acc
    }
    return Array.from({ length: props.total })
      .map((_, index) => index + 1)
      .reduce<number[]>(reduceCallback, [])
  })

  const onPaginationItemClick = (item: number) => {
    props.onChange(item)
  }
  return (
    <ul class='flex flex-wrap space-x-4'>
      <For each={range()}>
        {item => (
          <li>
            <button
              onClick={() => onPaginationItemClick(item)}
              class={paginationItem({
                intent: item === props.page ? 'active' : 'inActive'
              })}
            >
              {item}
            </button>
          </li>
        )}
      </For>
    </ul>
  )
}
