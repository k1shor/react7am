import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { API } from '../../config'

const PaymentForm = () => {
    const [stripeApiKey, setStripeApiKey] = useState('')

    useEffect(async ()=>{
        await fetch(`${API}/getStripeAPIKey`,{method:"GET"})
        .then(response=>response.json())
        .then(data=>setStripeApiKey(data))
        .catch(error=>console.log(error))

    },[])
  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
    <div><div className='payment col-md-4 my-5 p-5 shadow-lg'>
    <h4>Card Information</h4>
    <hr />
    {/* <label htmlFor='card_number'>Card Number:</label> */}
    <CardNumberElement type='text' className='form-control'   />
    <label htmlFor='card-expiry'>Valid Upto:</label>
    <CardExpiryElement type='text' className='form-control' id='card-expiry'  />
    <label htmlFor='card-cvc'>CVC:</label>
    <CardCvcElement type='text' className='form-control' id='card-cvc'  />
    <button className='btn btn-warning form-control' id='pay-btn' >Pay Now</button>

    <hr/>
    

</div></div></Elements>
  )
}

export default PaymentForm