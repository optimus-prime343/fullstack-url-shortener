/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createForm, Field, Form, zodForm } from '@modular-forms/solid'
import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { createSignal } from 'solid-js'

import { createUserResource } from '../../../resources/create-user-resource'
import type { RegisterPayload } from '../../../schemas/register-schema'
import { registerSchema } from '../../../schemas/register-schema'
import { registerUser } from '../../../services/auth-service'
import { AppAlert } from '../../ui/app-alert'
import { AppButton } from '../../ui/app-button'
import { AppInput } from '../../ui/app-input'

export const RegisterForm: Component = () => {
  const [, { refetch: refetchUser }] = createUserResource()

  const [error, setError] = createSignal<string | undefined>(undefined)
  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  const registerForm = createForm<RegisterPayload>({
    validate: zodForm(registerSchema),
  })

  const handleRegister = (values: RegisterPayload) => {
    registerUser(values)
      .then(async () => {
        await refetchUser()
        setError(undefined)
      })
      .catch(error => {
        setError((error as Error).message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <Form of={registerForm} onSubmit={handleRegister} class='space-y-4'>
      <Show when={error() !== undefined}>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <AppAlert intent='error' message={error()!} />
      </Show>
      <Field of={registerForm} name='email'>
        {field => (
          <AppInput
            {...field.props}
            name='email'
            type='email'
            label='Email Address'
            placeholder='Enter your email address'
            size='fullWidth'
            intent={field.error ? 'error' : undefined}
            error={field.error}
          />
        )}
      </Field>
      <Field of={registerForm} name='password'>
        {field => (
          <AppInput
            {...field.props}
            type='password'
            label='Password'
            placeholder='Enter your password'
            size='fullWidth'
            intent={field.error ? 'error' : undefined}
            error={field.error}
          />
        )}
      </Field>
      <AppButton disabled={isLoading()} type='submit' size='fullWidth'>
        Register
      </AppButton>
    </Form>
  )
}
