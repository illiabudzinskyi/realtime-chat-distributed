import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles.css'
import { App } from './components'
import { AuthUserProvider } from './context/AuthUserContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <App />
      </AuthUserProvider>
    </QueryClientProvider>
  </React.StrictMode>
)