import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Signup = () => {
  return (
    <>
      <Navbar />

      <main className="form-signin w-50 mx-auto my-5 shadow-lg p-5">
        <form>
          <img className="mb-4" src="logo192.png" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="firstname" placeholder="first name here" />
            <label for="firstname">First Name</label>
          </div>
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="lastname" placeholder="last name here" />
            <label for="lastname">Last Name</label>
          </div>

          <div className="form-floating mb-2">
            <input type="date" className="form-control" id="dob" placeholder="date of birth here" />
            <label for="dob">Date of Birth</label>
          </div>

          <div className='form-floating mb-2'>
            <div className='d-flex form-control'>

              <div className="form-check">
                <input className="form-check-input mt-1 me-2" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label className="form-check-label" for="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input mt-1 me-2" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" for="flexRadioDefault2">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input mt-1 me-2" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                <label className="form-check-label" for="flexRadioDefault3">
                  Others
                </label>
              </div>
            </div>
            <label>Gender</label>
          </div>


          <div className="form-floating mb-2">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-2">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-2">
            <input type="password" className="form-control" id="floatingCPassword" placeholder="Confirm Password" />
            <label for="floatingCPassword">Confirm Password</label>
          </div>


          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> I agree to the terms and conditions.
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
          Already have an account. <Link to='/signin'>Sign in</Link>

          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>

      <Footer />
    </>
  )
}

export default Signup