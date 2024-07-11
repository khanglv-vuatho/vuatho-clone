'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'

import store from '@/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='light'>
          <ProgressBar height='4px' color='#3748A0' options={{ showSpinner: false }} shallowRouting />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  )
}
