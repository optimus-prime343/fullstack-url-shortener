import { PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import type { ReactNode } from 'react'
import { z } from 'zod'

export interface AuthFormProps {
  children: ReactNode
}

const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(value => PASSWORD_REGEX.test(value), {
    message: 'Please enter a strong password',
  }),
})
type AuthPayload = z.infer<typeof authSchema>
export const AuthForm = () => {
  const form = useForm<AuthPayload>({
    validate: zodResolver(authSchema),
    initialValues: { email: '', password: '' },
  })
  return (
    <form>
      <Stack>
        <TextInput
          label='Email address'
          placeholder='Enter your email address'
        />
        <PasswordInput label='Password' placeholder='Enter your password' />
      </Stack>
    </form>
  )
}
