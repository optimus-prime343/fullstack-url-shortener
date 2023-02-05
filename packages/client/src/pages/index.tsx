import {
  Button,
  Flex,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconLink } from '@tabler/icons-react'

import { BaseLayout } from '../layouts/base-layout'
import { Navbar } from '../layouts/navbar'

export default function HomePage() {
  const theme = useMantineTheme()
  return (
    <BaseLayout title='Home'>
      <Navbar />
      <Title order={1} fw='bolder' tt='uppercase' ta='center' mt='lg'>
        Shorten your <Text color={theme.primaryColor}>looooooong</Text>URLs like
        never before
      </Title>
      <Text ta='center' mt='xs' size='sm' fw='bold'>
        Copy your long boring url.Paste it below.Then you got it, right ?
      </Text>
      <Flex mt='xl' align='center' gap='xs'>
        <TextInput
          sx={{ flex: 1 }}
          icon={<IconLink />}
          placeholder='Enter your long URL'
        />
        <Button>Shorten URL</Button>
      </Flex>
    </BaseLayout>
  )
}
