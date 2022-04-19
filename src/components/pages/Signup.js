import React from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Signup = () => {
  return (
    <>
    <Navbar/>

    <main class="form-signin">
  <form>
    <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
    <h1 class="h3 mb-3 fw-normal">Register</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="firstname" placeholder="first name here"/>
      <label for="firstname">First Name</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="lastname" placeholder="last name here"/>
      <label for="lastname">Last Name</label>
    </div>

    <div class="form-floating">
      <input type="date" class="form-control" id="dob" placeholder="date of birth here"/>
      <label for="dob">Date of Birth</label>
    </div>




    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</main>

<Footer/>
    </>
  )
}

export default Signup