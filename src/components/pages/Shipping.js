import React, { useEffect, useState } from 'react'
import CheckoutProgress from '../CheckoutProgress'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveShippingInfo } from '../../redux/actions/cartActions'

const Shipping = () => {
    const cart_items = useSelector(state => state.cart.cartItems)
    const shipping_info = useSelector(state=>state.cart.shippingInfo)
    const [total_order, setTotalOrder] = useState(0)
    const [total_price, setTotalPrice] = useState(0)

    const [shipping_add, setShippingAddress]=useState({
        shipping_address:'',
        alternate_shipping_address:'',
        city:'',
        country:'',
        phone:'',
        totalOrderPrice:''
    })
    const {shipping_address, alternate_shipping_address, city, country, phone,totalOrderPrice} = shipping_add

    const dispatch = useDispatch()

    const handleShippingAddress = name => event => {
        setShippingAddress({...shipping_add, [name]:event.target.value})
    }

    const saveShipping = (event) => {
        event.preventDefault()
        dispatch(saveShippingInfo(shipping_add))
    }


    useEffect(() => {
        let quantity_array = cart_items.map(item => { return item.quantity })
        let totalOrder = (quantity_array.reduce((acc, cur) => acc + cur))
        setTotalOrder(totalOrder)

        let price_array = cart_items.map(item => { return item.quantity * item.price })
        let totalPrice = price_array.reduce((acc, cur) => acc + cur)
        setTotalPrice(totalPrice)
        setShippingAddress({...shipping_add, totalOrderPrice:totalPrice})
    }, [])
    return (
        <>
            <Navbar />
            <div className='row d-flex  justify-content-evenly'>
                <div className='order-details col-md-8'>
                    <CheckoutProgress Shipping />
                        {
                        localStorage.getItem('shippingInfo') && 
                    <div className='mt-2 p-5 shadow-lg'>
                            <>
                            Shipping Address:
                            <p>{shipping_info.shipping_address}, {shipping_info.city}, {shipping_info.country}. Phone: {shipping_info.phone}</p>
                            <br/>
                            Alternate Shipping Address: 
                            <p>{shipping_info.alternate_shipping_address}, {shipping_info.city}, {shipping_info.country}. Phone: {shipping_info.phone}</p>
                            </>

                    </div>
                        }

                    <form className='w-75 p-5 shadow-lg mx-auto mt-2'>
                        <h4 className='text-center mb-3'>Shipping Information</h4>
                        <hr className='mb-3' />
                        <label htmlFor='street'>Street Address1:</label>
                        <input type={'text'} id='street' className='form-control' onChange={handleShippingAddress('shipping_address')} value={shipping_address}/>
                        <label htmlFor='street2'>Street Address2:</label>
                        <input type={'text'} id='street2' className='form-control' onChange={handleShippingAddress('alternate_shipping_address')} value={alternate_shipping_address}/>
                        <label htmlFor='city'>City:</label>
                        <input type={'text'} id='city' className='form-control' onChange={handleShippingAddress('city')} value={city}/>
                        {/* <label htmlFor='zipcode'>Zip Code:</label>
                        <input type={'text'} id='zipcode' className='form-control' onChange={handleShippingAddress('zipcode')} value={zip}/> */}
                        <label htmlFor='country'>Country:</label>
                        <input type={'text'} id='country' className='form-control' onChange={handleShippingAddress('country')} value={country}/>
                        <label htmlFor='phone'>Phone Number:</label>
                        <input type={'text'} id='phone' className='form-control' onChange={handleShippingAddress('phone')} value={phone}/>
                        <button className='btn btn-warning form-control mt-2' onClick={saveShipping} >Save Shipping Info</button>
                    </form>
                    <hr className='my-3' />
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


                        </tbody>
                    </table>
                </div>
                <div className='order-summary col-md-3 my-5 p-5 shadow-lg'>
                    <h4 className='mb-3'>Order Summary</h4>
                    <hr />
                    <h4 className='mb-2 mt-3'>Order Items: {total_order}</h4>
                    <h4 className='mb-2'>Total Price: Rs. {total_price}</h4>
                    <hr />
                    <Link to='/payment'>
                        <button className='btn btn-warning mt-3 form-control'>Proceed to Payment</button>
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Shipping