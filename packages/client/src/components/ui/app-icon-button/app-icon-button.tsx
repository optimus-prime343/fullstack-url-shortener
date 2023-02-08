import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'

export const AppIconButton = (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <button
      class={`focus-visible::ring rounded-md px-1 py-0.5 hover:bg-gray-700 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700 ${
        local.class ?? ''
      }`}
      {...rest}
    />
  )
}
