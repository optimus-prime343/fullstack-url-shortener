import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Component, JSX } from 'solid-js'
import { splitProps } from 'solid-js'

const text = cva([], {
  variants: {
    intent: {
      title: 'text-2xl font-bold leading-tight',
      body: 'text-sm font-semibold',
      caption: 'text-xs text-gray-300',
    },
  },
})
export type TextProps = VariantProps<typeof text>
export type AppTextProps = JSX.HTMLAttributes<HTMLParagraphElement> & TextProps

export const AppText: Component<AppTextProps> = props => {
  const [, rest] = splitProps(props, ['intent', 'class'])
  return (
    <p class={text({ class: props.class, intent: props.intent })} {...rest} />
  )
}
