/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { OpenGraphMetaData } from '@url-shortener/server'
import type { Component } from 'solid-js'
import { Show } from 'solid-js'

import { AppText } from '../../../ui/app-text'

export interface ShortenURLPreviewProps {
  openGraphMetaData: OpenGraphMetaData
}
export const ShortenURLPreview: Component<ShortenURLPreviewProps> = props => {
  return (
    <div>
      <Show when={props.openGraphMetaData.ogImage !== null}>
        <img
          class='aspect-video min-h-[10rem] rounded-md bg-gray-700'
          src={props.openGraphMetaData.ogImage!}
          alt='Preview image url'
        />
      </Show>
      <AppText class='mt-2' intent='body'>
        {props.openGraphMetaData.ogTitle}
      </AppText>
      <AppText intent='caption' class='mt-1'>
        {props.openGraphMetaData.ogDescription}
      </AppText>
    </div>
  )
}
