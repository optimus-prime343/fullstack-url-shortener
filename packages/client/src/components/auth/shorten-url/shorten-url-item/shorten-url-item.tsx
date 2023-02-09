import {
  IconCopy,
  IconExternalLink,
  IconEye,
  IconTrash
} from '@tabler/icons-solidjs'
import type { Component, JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import toast from 'solid-toast'

import { useShortenURL } from '../../../../context/shorten-url'
import { deleteShortenedURL } from '../../../../services/shorten-url-service'
import type { ShortenedURL } from '../../../../types/shortened-url'
import { AppIconButton } from '../../../ui/app-icon-button'
import { AppText } from '../../../ui/app-text'
import { ShortenURLPreview } from '../shorten-url-preview'

export interface ShortenURLItemProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  shortenURL: ShortenedURL
}
export const ShortenURLItem: Component<ShortenURLItemProps> = props => {
  const [local, rest] = splitProps(props, ['shortenURL'])
  const { fetchShortenedURLs } = useShortenURL()
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
      await fetchShortenedURLs()
      toast.success(message)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }
  return (
    <div
      {...rest}
      class='flex flex-col rounded-md bg-gray-800/50 p-4 transition-all hover:-translate-y-1 hover:shadow-sm'
    >
      <ShortenURLPreview
        openGraphMetaData={props.shortenURL.openGraphMetaData}
      />
      <div class='mt-auto'>
        <span class='my-4 block h-[1px] w-full bg-gray-700/50' />
        <AppText
          title={local.shortenURL.originalUrl}
          intent='body'
          class='overflow-hidden overflow-ellipsis whitespace-nowrap'
        >
          {local.shortenURL.originalUrl}
        </AppText>
        <a
          target='_blank'
          rel='noreferrer'
          class='my-2 flex items-center gap-4 text-primary-700'
          title={local.shortenURL.shortenedUrl}
          href={local.shortenURL.shortenedUrl}
        >
          <AppText
            intent='body'
            class='overflow-hidden overflow-ellipsis whitespace-nowrap font-bold'
          >
            {local.shortenURL.shortenedUrl}
          </AppText>
          <IconExternalLink size={35} />
        </a>
        <div class='flex'>
          <div class='flex items-center gap-2 text-gray-400'>
            <IconEye />
            <AppText class='font-bold' intent='caption'>
              {local.shortenURL.totalViews}
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
    </div>
  )
}
