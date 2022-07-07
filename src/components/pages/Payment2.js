import React, { useState, useEffect } from 'react'
import CheckoutProgress from '../CheckoutProgress'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { API } from '../../config'
import { isAuthenticated } from '../../API/userAPI'

const Payment = () => {
//     const cart_items = useSelector(state => state.cart.cartItems)
//     let shipping_info = useSelector(state => state.cart.shipping_info)

//     console.log(shipping_info)
//     const [order_quantity, setOrderQuantity] = useState(0)
//     const [order_total, setOrderTotal] = useState(0)

//     const stripe = useStripe()
//     const elements = useElements()

//     const {user, token} = isAuthenticated()

//     let  order = {

//     }
    const options = {
        style: {
            fontWeight: 400,
        fontFamily: 'futurabold',
        fontSize: '16px',
        lineHeight: '1.4',
        display: 'flex',
        color: '#555',
        backgroundColor: '#fff',
        '::placeholder': {
            color: '#888',
            fontFamily: 'futurabold',
        },
            invalid: {
                color: '#ff0000'
            }
        }
    }
//     useEffect(() => {
//         if (cart_items.length > 0) {
//             console.log(cart_items)
//             const quantity_array = cart_items.map(item => item.quantity)
//             setOrderQuantity(quantity_array.reduce((acc, cur) => acc + cur))

//             const price_array = cart_items.map(item => item.price * item.quantity)
//             setOrderTotal(price_array.reduce((acc, cur) => acc + cur))
//         }
//         else {
//             setOrderQuantity(0)
//             setOrderTotal(0)
//         }
//     }, [cart_items])

//     const paymentHandle = async (event) => {
//         event.preventDefault()
//         document.querySelector('#pay_btn').disabled = true
// try{
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Authorization: `Bearer ${token}`
//             }
//         }
//         const paymentData = { 
//             amount: order_total * 100
//         }
//         let response = await axios.post(`${API}/processpayment`, paymentData, config)
//         let client_secret = response.data.client_secret

//         console.log(client_secret)
//         if(!stripe || !elements){
//             return
//         }

//         let result =await stripe.confirmCardPayment(`${client_secret}`,{
//             payment_method: {
//                 card: elements.getElement(CardNumberElement),
//                 billing_details:{
//                     name: user.name,
//                     email: user.email
//                 }
//             }
//         })

//         if(result.error){
//             toast.error(result.error.message)
//             document.querySelector('#pay_btn').disabled = false
//         }
//         else{
//             if(result.paymentIntent.status === 'succeeded'){
//                 order.paymentInfo = {
//                     id: (await result).paymentIntent.id,
//                     status : (await result).paymentIntent.status
//                 }
//                 toast.success("Your order has been placed successfully.")
//                 localStorage.removeItem('cartItems')
//                 document.getElementById('pay_btn').disabled = true;
//             }
//         }
//     }
//     catch(error){
//         toast.error (error.message)
//     }
//     }


    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <Navbar />
            <CheckoutProgress ConfirmOrder Shipping Payment />




            {/* <div className='d-flex'>
                <div className='container mx-auto' style={{ width: '65%' }}> */}
                    <h4 className='mt-5'>Payment Information</h4>
                    <div className='mx-auto w-100 text-start p-5 shadow'>
                        <h4>Card Information</h4>
                        <hr className='mb-3' />
                        <label htmlFor='card_number'>Card Number</label>
                        <CardNumberElement type='text' className='form-control mb-3' id='card_number' options={options} />
                        <label htmlFor='card_expiry'>Valid Up to</label>
                        <CardExpiryElement type='text' className='form-control mb-3' id='card_expiry' options={options} />
                        <label htmlFor='card_cvc'> CVC</label>
                        <CardCvcElement type='text' className='form-control' id='card-cvc' options={options} />

                        <button className='btn btn-warning form-control mt-3' id='pay_btn'>Pay Now</button>

                    </div>


                    {/* <h4 className='mt-5'>Shipping Information</h4>
                    <div className='d-flex mx-auto w-100 text-start justify-content-evenly p-5 shadow'>
                        {/* <div className='shipping_ifo'>Shipping Address:
                            Street: {shipping_info.street}, <br />
                            City: {shipping_info.city}, <br />
                            Country: {shipping_info.country}<br />
                            Phone: {shipping_info.phone}
                        </div> */}
                        {/* {
                            shipping_info.street2 &&
                            <div className='shipping_ifo'>Alternate Shipping Address:
                                Street: {shipping_info.street2}, <br />
                                City: {shipping_info.city}, <br />
                                Country: {shipping_info.country}<br />
                                Phone: {shipping_info.phone}
                            </div>

                        }
                        <div className='alternate-shipping_info'></div>
                    </div>

                    <h4 className='mt-5'>Order Information</h4>
                    {cart_items.length > 0 ?
                        <table className="table mb-5 shadow-lg table-striped table-hover text-center align-middle table-bordered ">
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th>Product Image</th>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Number</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart_items.map((item, i) => {
                                        return <tr>
                                            <td>{i + 1}</td>
                                            <td><img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ height: 200 }} /></td>
                                            <td>
                                                <h4>{item.name}</h4>
                                            </td>
                                            <td>
                                                <h5>Rs. {item.price}</h5>
                                            </td>
                                            <td>
                                                <h4>
                                                    {item.quantity}
                                                </h4>
                                            </td>
                                            <td><h4>
                                                Rs. {item.price * item.quantity}
                                            </h4></td>

                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <div className='alert alert-danger mt-5'>No items in cart</div>

                    }

                </div>
                <div className='container me-5' style={{ width: '20%' }}>
                    <div className='shadow-lg  p-3 mt-5'>
                        <p>Order Items: <br /><b className='fs-3'> {order_quantity}</b></p>
                        <p>Total Order Price: <br /><b className='fs-3'>Rs. {order_total}</b> </p>
                        <hr className='my-2' />

                    </div>
                </div> */}
            {/* </div> */} 


            <Footer />
        </>
    )
}

export default Payment