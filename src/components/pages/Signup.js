import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Signup = () => {
  // to store name, email, password, 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  // to display error or success
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


  return (
    <>
      <Navbar />

      <main className="form-signin w-50 mx-auto my-5 shadow-lg p-5">
        <form>
          <img className="mb-4" src="logo192.png" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="firstname" placeholder="enter name here" onChange={event=>setName(event.target.value)}/>
            <label for="firstname">Name</label>
          </div>
          {/* <div className="form-floating mb-2">
            <input type="text" className="form-control" id="firstname" placeholder="first name here" />
            <label for="firstname">First Name</label>
          </div>
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="lastname" placeholder="last name here" />
            <label for="lastname">Last Name</label>
          </div> */}

          {/* <div className="form-floating mb-2">
            <input type="date" className="form-control" id="dob" placeholder="date of birth here" />
            <label for="dob">Date of Birth</label>
          </div> */}

          {/* <div className='form-floating mb-2'>
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
          </div> */}


          <div className="form-floating mb-2">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e=>setEmail(e.target.value)}/>
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-2">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
            <label for="floatingPassword">Password</label>
          </div>
          {/* <div className="form-floating mb-2">
            <input type="password" className="form-control" id="floatingCPassword" placeholder="Confirm Password" />
            <label for="floatingCPassword">Confirm Password</label>
          </div> */}


          {/* <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> I agree to the terms and conditions.
            </label>
          </div> */}
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Register</button>
          Already have an account. <Link to='/signin'>Sign in</Link>

          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>

      <Footer />
    </>
  )
}

export default Signup