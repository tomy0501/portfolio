import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Router.tsx'
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className="flex items-center justify-center w-[80%] min-w-[300px] m-auto min-h-screen bg-gray-100">
        <RouterProvider router={router} />
      </div>
  </StrictMode>,
)
