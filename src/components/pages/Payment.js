import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../../API/userAPI'
import { API } from '../../config'
import { createOrder } from '../../redux/actions/orderActions'
import CheckoutProgress from '../CheckoutProgress'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Payment = () => {
    const cart_items = useSelector(state => state.cart.cartItems)
    const shipping_info = useSelector(state => state.cart.shippingInfo)
    const [total_price, setTotalPrice] = useState(0)

    const stripe = useStripe()
    const elements = useElements()
    let {user, token} = isAuthenticated()

    const dispatch = useDispatch()

    let options = {
        style: {
            base: {
                fontSize: '16px'
                        },
            invalid: {
                color: '#ff0000'
            }
        }
    }

    useEffect(() => {
        let price_array = cart_items.map(item => { return item.quantity * item.price })
        let totalPrice = price_array.reduce((acc, cur) => acc + cur)
        setTotalPrice(totalPrice)
    }, [])

    let order = {
        orderItems: cart_items,
        userId: user._id,
        shipping_address: shipping_info.shipping_address,
        alternate_shipping_address: shipping_info.alternate_shipping_address,
        city: shipping_info.city,
        country: shipping_info.country,
        phone: shipping_info.phone
        // totalOrderPrice: totalPrice
    }

    const paymentData = {
        amount: total_price * 100
    }

    const paymentHandle = async (event) => {
        event.preventDefault()
        document.getElementById('pay-btn').disabled = true

        let response
        try{
            const config = {
                headers: {
                    'Content-Type':"application/json"
                    // Authorization : `Bearer ${token}`
                }
            }
            response = await axios.post(`${API}/processpayment`, paymentData, config )

            const client_secret = response.data.client_secret

            if(!stripe || !elements){
                return
            }

            const result = await stripe.confirmCardPayment(`${client_secret}`,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error){
                toast.error(result.error.message)
                document.querySelector('#pay-btn').disabled = false
            }
            else{
                if(result.paymentIntent.status === 'succeeded'){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    localStorage.removeItem('cartItems')
                    document.querySelector('#pay-btn').disabled = true
                    // place order
                    dispatch(createOrder(order))
                    toast.success("Your order has been placed")
                }
            }
        }
        catch(error){
            toast.error(error.message)
            document.getElementById('pay-btn').disabled = false
        }

    }

    return (
        <>
            <>
            <ToastContainer/>
                <Navbar />
                <div className='row d-flex  justify-content-evenly'>
                    <div className='order-details col-md-8'>
                        <CheckoutProgress confirmOrder Shipping Payment />


                        {
                            localStorage.getItem('shippingInfo') &&
                            <div className='mt-2 p-5 shadow-lg'>
                                <>
                                    <h4 className='text-center mb-3'>Shipping Details</h4>
                                    <hr />
                                    Shipping Address:
                                    <p>{shipping_info.shipping_address}, {shipping_info.city}, {shipping_info.country}. Phone: {shipping_info.phone}</p>
                                    <br />
                                    Alternate Shipping Address:
                                    <p>{shipping_info.alternate_shipping_address}, {shipping_info.city}, {shipping_info.country}. Phone: {shipping_info.phone}</p>
                                </>

                            </div>
                        }

                        <h4 className='text-center mt-3'>Order Details</h4>
                        <hr />
                        <table className='table text-center align-middle '>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Product Image</th>
                                    <th>Product Info</th>
                                    <th>Unit Price</th>
                                    <th>Number</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart_items.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ "height": "100px" }} />
                                            </td>
                                            <td>
                                                <h4>{item.name}</h4>
                                            </td>
                                            <td>
                                                <h5>Rs. {item.price}</h5>
                                            </td>
                                            <td>
                                                <h5>
                                                    {item.quantity}
                                                </h5>
                                            </td>
                                            <td>
                                                <h5>Rs. {item.quantity * item.price}</h5>
                                            </td>

                                        </tr>

                                    })
                                }
                                <tr>
                                    <td colSpan={6} className='text-end'>
                                        <h3>Total Price: Rs. {total_price}</h3>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                    <div className='payment col-md-4 my-5 p-5 shadow-lg'>
                        <h4>Card Information</h4>
                        <hr />
                        <label htmlFor='card_number'>Card Number:</label>
                        <CardNumberElement type='text' className='form-control' id='card_number' options={options} />
                        <label htmlFor='card-expiry'>Valid Upto:</label>
                        <CardExpiryElement type='text' className='form-control' id='card-expiry' options={options} />
                        <label htmlFor='card-cvc'>CVC:</label>
                        <CardCvcElement type='text' className='form-control' id='card-cvc' options={options} />
                        <button className='btn btn-warning form-control' id='pay-btn' onClick={paymentHandle}>Pay Now</button>

                        <hr/>
                        

                    </div>
                </div>

                <Footer />
            </>

        </>
    )
}

export default Payment