import { Container } from '@mantine/core'
import Head from 'next/head'
import type { ReactNode } from 'react'

export interface BaseLayoutProps {
  title: string
  children: ReactNode
}
export const BaseLayout = ({ title, children }: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>URL Shortener - {title}</title>
        <meta name='title' content='URL Shortener' />
        <meta
          name='description'
          content='A URL shortener is a web-based tool that allows users to convert long, complex URLs into short, simple links that are easier to share and remember. With our URL shortener application, you can quickly and easily shorten any URL, making it perfect for sharing on social media, sending in emails, or publishing on websites. The platform is user-friendly, fast, and secure, ensuring that your shortened links are safe and reliable. Try it out now and experience the convenience of shortened URLs!'
        />
        <meta
          name='keywords'
          content='URL shortener, web-based tool, convert long URL, simple link, social media, email, website, user-friendly, fast, secure, shortened links, convenience.'
        />
        <meta name='robots' content='index, follow' />
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
        <meta name='author' content='Sachin Aryal' />
      </Head>
      <Container>{children}</Container>
    </>
  )
}
