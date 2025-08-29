import { useEffect, useState, useMemo, useCallback, createContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inputs from "./components/inputs.jsx"
import './App.css'
import Grid from './components/grid.jsx'
import Editable from './components/editable.jsx'
import TaskList from './components/Tasklist.jsx'
import FocusTracker from './components/focustracker.jsx'
import Memo from './components/memo.jsx'
import Main from './components/Main.jsx'
import Container from './components/Container.jsx'
import Login from './components/Login.jsx'
import Card from './components/card.jsx'
import Renderapi from './components/renderapi.jsx'
export const auth = createContext();
const fetchdata = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}
function App() {
  const router = createBrowserRouter([
    {
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Grid />,
          errorElement: <div>Error loading grid</div>
        },
        {
          path: "/cards/:id",
          element: <Card />,
        },
        {
          path: "/container",
          element: <Container />,
        },
        {
          path: "/memo",
          element: <Memo />,
        },
        {
          path: "/focustracker",
          element: <FocusTracker />,
        },
        {
          path: "/editable",
          element: <div className="Two">
            <Editable />
            <Inputs />
          </div>,
        },
        {
          path: "/tasklist",
          element: <TaskList />,
        },
        {
          path: "/renderapi",
          element: <Renderapi />,
          loader: fetchdata,
          errorElement: <h1>❌ Could not load data</h1>
        },
        {
          path: "/login",
          element: <Login />
        }
      ],
    },
  ])
  useEffect(() => {
    console.log("Welcome to my first react page")
  }, [])
  useEffect(() => {
    console.log("i will be logged no matter what")
  })
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
