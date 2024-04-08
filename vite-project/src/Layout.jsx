import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Provider } from "react-redux";
import { Outlet} from 'react-router-dom'
import Store from './store/Store.jsx'

function Layout() {
  return (
    <>
        <Provider store= {Store}>
           <Outlet/>
         <Footer/>
        </Provider>
       
    </>
  )
}

export default Layout
