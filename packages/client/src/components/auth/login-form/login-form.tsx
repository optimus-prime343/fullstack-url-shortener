import { createForm, Field, Form, zodForm } from '@modular-forms/solid'
import type { Component } from 'solid-js'

import type { LoginPayload } from '../../../schemas/login-schema'
import { loginSchema } from '../../../schemas/login-schema'
import { AppButton } from '../../ui/app-button'
import { AppInput } from '../../ui/app-input'

export const LoginForm: Component = () => {
  const loginForm = createForm<LoginPayload>({
    validate: zodForm(loginSchema),
  })

  const handleLogin = (values: LoginPayload) => {
    console.log(values)
  }
  return (
    <Form of={loginForm} class='space-y-4' onSubmit={handleLogin}>
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
      <AppButton size='fullWidth'>Login</AppButton>
    </Form>
  )
}
