import { createForm, Field, Form, zodForm } from '@modular-forms/solid'
import type { Component } from 'solid-js'

import type { RegisterPayload } from '../../../schemas/register-schema'
import { registerSchema } from '../../../schemas/register-schema'
import { AppButton } from '../../ui/app-button'
import { AppInput } from '../../ui/app-input'

export const RegisterForm: Component = () => {
  const registerForm = createForm<RegisterPayload>({
    validate: zodForm(registerSchema),
  })

  const handleRegister = (values: RegisterPayload) => {
    console.log(values)
  }
  return (
    <Form of={registerForm} onSubmit={handleRegister} class='space-y-4'>
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
      <AppButton type='submit' size='fullWidth'>
        Register
      </AppButton>
    </Form>
  )
}
