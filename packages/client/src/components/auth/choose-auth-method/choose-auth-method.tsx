import type { Component } from 'solid-js'
import { createMemo } from 'solid-js'
import { createSignal } from 'solid-js'

import appIconImage from '../../../assets/images/app_icon.png'
import { AppText } from '../../ui/app-text'
import { LoginForm } from '../login-form'
import { RegisterForm } from '../register-form'

export type AuthMethod = 'register' | 'login'

export const ChooseAuthMethod: Component = () => {
  const [authMethod, setAuthMethod] = createSignal<AuthMethod>('login')

  const switchAuthMethodText = createMemo(() =>
    authMethod() === 'login'
      ? 'Dont have an account? Register'
      : 'Already have an account ? Login'
  )
  const toggleAuthMethod = () => {
    setAuthMethod(authMethod() === 'login' ? 'register' : 'login')
  }
  return (
    <div class='rounded-md bg-gray-800/50 py-6 px-4 shadow-md lg:min-w-[25rem]'>
      <img src={appIconImage} class='mx-auto h-40 w-40 object-contain' />
      <AppText class='text-center' intent='title'>
        URL SHORTENER
      </AppText>
      <span class='my-6 block h-0.5 w-full bg-gray-800/50' />
      {authMethod() === 'login' ? <LoginForm /> : <RegisterForm />}
      <div class='mt-3' role='button' tabIndex={1} onClick={toggleAuthMethod}>
        <AppText class='text-center' intent='body'>
          {switchAuthMethodText()}
        </AppText>
      </div>
    </div>
  )
}
