import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {SearchProvider} from './components/Home/SearchContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Searchbar functionality */}
      <SearchProvider>
        <App />
      </SearchProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
