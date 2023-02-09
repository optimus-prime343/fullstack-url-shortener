import {
  IconCopy,
  IconExternalLink,
  IconEye,
  IconTrash
} from '@tabler/icons-solidjs'
import type { Component } from 'solid-js'
import toast from 'solid-toast'

import { useShortenURL } from '../../../../context/shorten-url'
import { deleteShortenedURL } from '../../../../services/shorten-url-service'
import type { ShortenedURL } from '../../../../types/shortened-url'
import { AppIconButton } from '../../../ui/app-icon-button'
import { AppText } from '../../../ui/app-text'
import { ShortenURLPreview } from '../shorten-url-preview'

export interface ShortenURLItemProps {
  shortenURL: ShortenedURL
}
export const ShortenURLItem: Component<ShortenURLItemProps> = props => {
  const { refetchShortenedURLs } = useShortenURL()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.shortenURL.shortenedUrl)
      toast.success('Copied short url to Clipboard')
    } catch (error) {
      toast.error('Failed to copy text to the clipboard')
    }
  }
  const handleDelete = async () => {
    try {
      const message = await deleteShortenedURL(props.shortenURL.id)
      await refetchShortenedURLs()
      toast.success(message)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }
  return (
    <div class='rounded-md bg-gray-800 p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md'>
      <ShortenURLPreview
        openGraphMetaData={props.shortenURL.openGraphMetaData}
      />
      <span class='my-2 block h-0.5 w-full bg-gray-700/50' />
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
          <AppIconButton class='text-red-800' onClick={handleDelete}>
            <IconTrash />
          </AppIconButton>
        </div>
      </div>
    </div>
  )
}
