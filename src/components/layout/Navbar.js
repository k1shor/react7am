import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return (
        <>
            <div className='row pt-1 bg-dark'>
                <div className='col-md-3 text-center'>
                    <Link className="navbar-brand fs-3 fw-bold text-white" to="/">Navbar</Link>
                </div>
                <div className='col-md-6'>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-warning" type="submit">Search</button>
                    </form>
                </div>
                <div className='col-md-3 d-flex justify-content-evenly'>
                    <Link to='/signin'><i class="bi bi-box-arrow-in-right fs-3 fw-bold text-white"></i></Link>
                    <Link to='/signup'><i class="bi bi-person-plus fs-3 fw-bold text-white"></i></Link>
                    <Link to='/cart'><i class="bi bi-cart fs-3 fw-bold text-white"></i></Link>

                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar