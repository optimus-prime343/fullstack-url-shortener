import type { Component } from 'solid-js'

import ErrorImage from '../../../assets/images/warning.png'
import { AppButton } from '../../ui/app-button'
import { AppText } from '../../ui/app-text'

export interface ErrorViewProps {
  title?: string
  description?: string
  onRetry?: () => void
}
export const ErrorView: Component<ErrorViewProps> = props => {
  return (
    <div class='flex min-h-screen flex-col items-center justify-center'>
      <img class='h-48' src={ErrorImage} />
      <AppText class='mt-4 text-red-700' intent='title'>
        {props.title ?? 'Error'}
      </AppText>
      <AppText class='mt-2 max-w-md text-center'>
        {props.description ?? 'Something went wrong! Please try again later.'}
      </AppText>
      <AppButton class='mt-4' onClick={props.onRetry}>
        Retry
      </AppButton>
    </div>
  )
}
