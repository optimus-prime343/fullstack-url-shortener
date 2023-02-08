import {
  IconCopy,
  IconExternalLink,
  IconEye,
  IconTrash
} from '@tabler/icons-solidjs'
import type { Url } from '@url-shortener/server'
import type { Component } from 'solid-js'
import toast from 'solid-toast'

import { AppIconButton } from '../../../ui/app-icon-button'
import { AppText } from '../../../ui/app-text'

export interface ShortenURLItemProps {
  shortenURL: Url
}
export const ShortenURLItem: Component<ShortenURLItemProps> = props => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.shortenURL.shortenedUrl)
      toast.success('Copied short url to Clipboard')
    } catch (error) {
      toast.error('Failed to copy text to the clipboard')
    }
  }
  return (
    <div class='space-y-2 rounded-md bg-gray-800 p-4 shadow-sm hover:shadow-md'>
      <AppText
        title={props.shortenURL.originalUrl}
        intent='body'
        class='overflow-hidden overflow-ellipsis whitespace-nowrap'
      >
        {props.shortenURL.originalUrl}
      </AppText>
      <a
        class='flex items-center gap-4 text-primary-700'
        title={props.shortenURL.shortenedUrl}
        href={props.shortenURL.shortenedUrl}
      >
        <AppText
          intent='body'
          class='overflow-hidden overflow-ellipsis whitespace-nowrap font-bold'
        >
          {props.shortenURL.shortenedUrl}
        </AppText>
        <IconExternalLink size={50} />
      </a>
      <div class='flex'>
        <div class='flex items-center gap-2 text-gray-400'>
          <IconEye />
          <AppText class='font-bold' intent='caption'>
            {props.shortenURL.totalViews}
          </AppText>
        </div>
        <div class='flex flex-1 justify-end gap-1'>
          <AppIconButton class='text-primary-800' onClick={handleCopy}>
            <IconCopy />
          </AppIconButton>
          <AppIconButton class='text-red-800'>
            <IconTrash />
          </AppIconButton>
        </div>
      </div>
    </div>
  )
}
