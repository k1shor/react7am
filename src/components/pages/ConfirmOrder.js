import React, { useEffect, useState } from 'react'
import CheckoutProgress from '../CheckoutProgress'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ConfirmOrder = () => {
    const cart_items = useSelector(state => state.cart.cartItems)
    const [total_order, setTotalOrder] = useState(0)
    const [total_price, setTotalPrice] = useState(0)

    useEffect(()=>{
        let quantity_array = cart_items.map(item=>{return item.quantity})
        let totalOrder = (quantity_array.reduce((acc,cur)=>acc+cur))
        setTotalOrder(totalOrder)

        let price_array = cart_items.map(item=>{return item.quantity*item.price})
        let totalPrice = price_array.reduce((acc,cur)=>acc+cur)
        setTotalPrice(totalPrice)
    },[])
    return (
        <>
            <Navbar />
            <div className='row d-flex  justify-content-evenly'>
                <div className='order-details col-md-8'>
                    <CheckoutProgress />
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
                                            <h5>Rs. {item.quantity*item.price}</h5>
                                        </td>

                                    </tr>

                                })
                            }


                        </tbody>
                    </table>
                </div>
                <div className='order-summary col-md-3 my-5 p-5 shadow-lg'>
                    <h4 className='mb-3'>Order Summary</h4>
                    <hr/>
                    <h4 className='mb-2 mt-3'>Order Items: {total_order}</h4>
                    <h4 className='mb-2'>Total Price: Rs. {total_price}</h4>
                    <hr/>
                    <Link to='/shipping'>
                    <button className='btn btn-warning mt-3 form-control'>Proceed to Shipping</button>
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ConfirmOrder