
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import SmallBody from './components/calculatorBody/SmallBody.jsx'
import FullBody from './components/calculatorBody/FullBody.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children: [
      {
        path:"",
        element: <SmallBody/>
      },{
        path:"full",
        element: <FullBody/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
  </>,
)
