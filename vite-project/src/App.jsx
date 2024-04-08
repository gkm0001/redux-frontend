import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './components/Home'
import Layout from './Layout'
import Cart from './components/Cart'

function App() {
  

  return (
     <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                <Route path='' element= {<Home/>}/> 
                <Route path='cart' element= {<Cart/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
     </>
  )
}

export default App
