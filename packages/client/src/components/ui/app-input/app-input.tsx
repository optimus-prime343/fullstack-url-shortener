import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Component, JSX } from 'solid-js'
import { createMemo } from 'solid-js'
import { Show } from 'solid-js'
import { createUniqueId, splitProps } from 'solid-js'

import { AppText } from '../app-text'

const input = cva(
  [
    'rounded-md bg-gray-800 px-4 py-2 border-2 border-transparent transition-colors duration-300 focus:outline-none focus:border-primary-800 disabled:opacity-25',
  ],
  {
    variants: {
      intent: {
        error: 'border-red-800 focus:border-red-700 placeholder:text-red-700',
      },
      size: {
        fullWidth: 'w-full',
      },
    },
  }
)
export type InputProps = VariantProps<typeof input>
export type AppInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  InputProps & { label?: string; error?: string }
export const AppInput: Component<AppInputProps> = props => {
  const [local, restProps] = splitProps(props, [
    'intent',
    'size',
    'class',
    'label',
    'error',
  ])

  const inputId = createUniqueId()

  const labelClass = createMemo(
    () =>
      `text-xs mb-2 block font-bold ${
        props.disabled ? 'text-gray-600' : 'text-gray-300'
      }`
  )
  return (
    <div class='flex-1'>
      <Show when={local.label !== undefined}>
        <label class={labelClass()} for={inputId}>
          {local.label}
        </label>
      </Show>
      <input
        id={local.label !== undefined ? inputId : props.id}
        class={input({
          intent: local.intent,
          size: local.size,
          class: local.class,
        })}
        {...restProps}
      />
      <Show when={local.error !== undefined}>
        <AppText class='mt-1 text-red-700' intent='caption'>
          {local.error}
        </AppText>
      </Show>
    </div>
  )
}
