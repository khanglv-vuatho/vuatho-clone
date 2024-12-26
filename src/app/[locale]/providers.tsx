'use client'

import { NextUIProvider } from '@nextui-org/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Provider } from 'react-redux'

import store from '@/store'

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
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
