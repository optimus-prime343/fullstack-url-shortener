import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Component, JSX } from 'solid-js'
import { createMemo } from 'solid-js'
import { splitProps } from 'solid-js'

import SuccessImage from '../../../assets/images/success.png'
import ErrorImage from '../../../assets/images/warning.png'
import { AppText } from '../app-text'

const alert = cva(['px-2 py-4 rounded-md flex items-center gap-6'], {
  variants: {
    intent: {
      error: 'bg-red-100 text-red-700',
      success: 'bg-green-100 text-green-700',
    },
  },
  defaultVariants: {
    intent: 'error',
  },
})
export type AlertProps = VariantProps<typeof alert>
export type AppAlertProps = JSX.HTMLAttributes<HTMLDivElement> &
  AlertProps & { message: string }

export const AppAlert: Component<AppAlertProps> = props => {
  const [local, restProps] = splitProps(props, ['intent', 'message', 'class'])

  const alertImage = createMemo(() =>
    local.intent === 'success' ? SuccessImage : ErrorImage
  )
  return (
    <div
      {...restProps}
      class={alert({ intent: local.intent, class: local.class })}
    >
      <img src={alertImage()} class='h-8 w-8' />
      <div>
        <AppText intent='title'>
          {local.intent?.toUpperCase() ?? 'Error'}
        </AppText>
        <AppText intent='body'>{local.message}</AppText>
      </div>
    </div>
  )
}
