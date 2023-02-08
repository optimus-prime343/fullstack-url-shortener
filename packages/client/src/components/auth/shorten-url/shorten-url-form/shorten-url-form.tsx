/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { createMemo } from 'solid-js'
import { createSignal } from 'solid-js'

import { useShortenURL } from '../../../../context/shorten-url'
import { shortenURL } from '../../../../services/shorten-url-service'
import { AppAlert } from '../../../ui/app-alert'
import { AppButton } from '../../../ui/app-button'
import { AppInput } from '../../../ui/app-input'

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

export const ShortenURLForm: Component = () => {
  const { refetchShortenedURLs } = useShortenURL()

  const [lengthyURL, setLengthyURL] = createSignal<string>('')
  const [error, setError] = createSignal<string | undefined>(undefined)
  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  const isValidUrl = createMemo(() => URL_REGEX.test(lengthyURL()))

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await shortenURL(lengthyURL())
      await refetchShortenedURLs()
      setLengthyURL('')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Show when={error() !== undefined}>
        <AppAlert class='mb-4' message={error()!} />
      </Show>
      <form onSubmit={handleFormSubmit} class='flex gap-1'>
        <AppInput
          placeholder='Enter your lengthy URL'
          class='w-full flex-1'
          value={lengthyURL()}
          onInput={event => setLengthyURL(event.currentTarget.value)}
        />
        <AppButton type='submit' disabled={!isValidUrl() || isLoading()}>
          Shorten URL
        </AppButton>
      </form>
    </>
  )
}
