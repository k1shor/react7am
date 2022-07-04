import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutProgress = ({ Shipping, Payment }) => {
    return (
        <>
            <div className='container d-flex my-3 mx-auto justify-content-evenly'>
                <Link to='/cart'>
                    <button className='btn btn-warning'>Back to Cart</button>
                </Link>
                <Link to='/confirmorder'>
                    <button className='btn btn-warning'>Confirm Order</button>
                </Link>
                {
                    Shipping ? <Link to='/shipping'><button className='btn btn-warning'>Shipping</button></Link> :
                        <button className='btn btn-warning disabled'>Shipping</button>
                }

                {
                    Payment ? <button className='btn btn-warning'>Payment</button> :
                        <button className='btn btn-warning disabled'>Payment</button>
                }
            </div>

        </>
    )
}

export default CheckoutProgress