import { Box } from '@mantine/core'
import type { ContextModalProps } from '@mantine/modals'

import { AuthForm } from './auth-form'

export const GetStartedModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  modalBody: string
}>) => {
  return (
    <Box>
      <AuthForm />
    </Box>
  )
}
