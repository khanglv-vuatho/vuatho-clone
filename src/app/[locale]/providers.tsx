'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { NextUIProvider } from '@nextui-org/react'
import store from '@/store'
import { Provider } from 'react-redux'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='light'>
          <ProgressBar
            height='4px'
            color='#3748A0'
            options={{ showSpinner: true }}
            shallowRouting
          />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  )
}
