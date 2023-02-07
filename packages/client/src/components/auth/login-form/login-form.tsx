/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createForm, Field, Form, zodForm } from '@modular-forms/solid'
import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { createSignal } from 'solid-js'

import { useUser } from '../../../context/user'
import type { LoginPayload } from '../../../schemas/login-schema'
import { loginSchema } from '../../../schemas/login-schema'
import { loginUser } from '../../../services/auth-service'
import { AppAlert } from '../../ui/app-alert'
import { AppButton } from '../../ui/app-button'
import { AppInput } from '../../ui/app-input'

export const LoginForm: Component = () => {
  const { refetchUser } = useUser()
  const [error, setError] = createSignal<string | undefined>()
  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  const loginForm = createForm<LoginPayload>({
    validate: zodForm(loginSchema),
  })

  const handleLogin = (values: LoginPayload) => {
    setIsLoading(true)
    loginUser(values)
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
    <Form of={loginForm} class='space-y-4' onSubmit={handleLogin}>
      <Show when={error() !== undefined}>
        <AppAlert intent='error' message={error()!} />
      </Show>
      <Field of={loginForm} name='email'>
        {field => (
          <AppInput
            {...field.props}
            size='fullWidth'
            label='Email Address'
            placeholder='Enter your email address'
            intent={field.error ? 'error' : undefined}
            error={field.error}
          />
        )}
      </Field>
      <Field of={loginForm} name='password'>
        {field => (
          <AppInput
            {...field.props}
            type='password'
            size='fullWidth'
            label='Password'
            placeholder='Enter your password'
            intent={field.error ? 'error' : undefined}
            error={field.error}
          />
        )}
      </Field>
      <AppButton disabled={isLoading()} size='fullWidth'>
        Login
      </AppButton>
    </Form>
  )
}
