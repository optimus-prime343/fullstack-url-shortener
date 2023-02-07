import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Component, JSX } from 'solid-js'
import { splitProps } from 'solid-js'

const button = cva(
  [
    'px-4 py-2 shadow-sm text-md rounded-md font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-gray-900 focus-visible:ring-offset-2 focus-visible:ring-primary-700 disabled:opacity-30',
  ],
  {
    variants: {
      intent: {
        primary:
          'bg-primary-800 disabled:hover:bg-primary-800 hover:bg-primary-700',
        secondary:
          'bg-gray-800 disabled:hover:bg-gray-800 hover:bg-gray-700 focus-visible:ring-gray-800',
      },
      size: {
        fullWidth: 'w-full',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
)
export type ButtonProps = VariantProps<typeof button>

export type AppButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps

export const AppButton: Component<AppButtonProps> = props => {
  const [, rest] = splitProps(props, ['intent', 'class'])
  return (
    <button
      class={button({
        intent: props.intent,
        size: props.size,
        class: props.class,
      })}
      {...rest}
    />
  )
}
