import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Signin from './components/pages/Signin'
// import First from './pages/First'
// import Second from './pages/Second'
// import Third from './pages/Third'


const MyRoutes = () => {
  return (
    <Router>
        <Routes>
            {/* <Route path='/' element={<First/>}/>
            <Route path='/sss' element={<Second/>}/>
            <Route path='/ttt' element={<Third/>}/> */}

            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>

        </Routes>
    </Router>
    
  )
}

export default MyRoutes