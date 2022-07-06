import React, { useEffect, useState } from 'react'
import { API } from '../../config'
import Payment from './Payment'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment2 from './Payment2'

const PaymentElement = () => {
    const [stripeApiKey, setStripeApiKey] = useState('')

    useEffect(async ()=>{
        await fetch(`${API}/getStripeAPIKey`,{method:"GET"})
        .then(response=>response.json())
        .then(data=>setStripeApiKey(data))
        .catch(error=>console.log(error))

    },[])

    console.log(stripeApiKey)

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
    {/* <Payment2/> */}
    <Payment/>
    </Elements>
  )
}

export default PaymentElement