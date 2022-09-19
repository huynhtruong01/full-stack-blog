import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'
import './assets/css/index.css'
import { ThemeProvider } from '@mui/material'
import theme from './utils/theme'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <App />
            </Router>
        </ThemeProvider>
    </QueryClientProvider>
    // </React.StrictMode>
)
