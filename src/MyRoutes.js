import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './components/pages/Cart'
import Home from './components/pages/Home'
import Homepage from './components/pages/Homepage'
import Productspage from './components/pages/Productspage'
import Services from './components/pages/Services'
import Signin from './components/pages/Signin'
import Signup from './components/pages/Signup'
import Blogs from './components/pages/Blogs'
import Contact from './components/pages/Contact'

const MyRoutes = () => {
  return (
    <Router>
        <Routes>
            {/* <Route path='/' element={<First/>}/>
            <Route path='/sss' element={<Second/>}/>
            <Route path='/ttt' element={<Third/>}/> */}

            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>} />
            <Route path='/cart' element={<Cart/>}/>

            {/* material pages  */}
            <Route path='/home' element={<Homepage/>}/>
            <Route path='/products' element={<Productspage/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/blogs' element={<Blogs/>}/>
            <Route path='/contact' element ={<Contact/>}/>
            

        </Routes>
    </Router>
    
  )
}

export default MyRoutes