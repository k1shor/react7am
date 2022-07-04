import React from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import { useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../redux/actions/cartActions'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Cart = () => {
    const cart_items = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()

    const increaseQuantity =(id, quantity, stock) => {
        let new_quantity = quantity+1
        if(new_quantity>stock){
            toast.error('cannot increase quantity more than stock')
            return
        }
        else{
            dispatch(addItemToCart(id, new_quantity))
            toast.success('quantity increased')
        }
    }
    const decreaseQuantity = (id, quantity) => {
        let new_quantity = quantity-1
        if(new_quantity<=0){
            toast.error('cannot decrease quantity. Remove item instead')
            return
        }
        else{
            dispatch(addItemToCart(id, new_quantity))
            toast.success('quantity decreased')
        }
    }
    const removeFromCart = (id, name) => {
        dispatch(removeItemFromCart(id))
        toast.success(`${name} removed from cart`)
    }


    return (
        <>
        <ToastContainer theme='colored' position='top-right'/>
            <Navbar />
            <div className='container mx-auto'>
                <h3 className='text-center'>Cart Items</h3>
                <hr />

                <table className='table text-center align-middle '>
                    <thead>
                        <tr>
                            <th width="10%">S.No.</th>
                            <th width="20%">Product Image</th>
                            <th width="50%">Product Details</th>
                            <th>Number</th>
                            <th width="20%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart_items.map((item, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ "width": "100%" }} />
                                    </td>
                                    <td>
                                        <h4>{item.name}</h4>
                                        <h5>Rs. {item.price}</h5>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <button className='btn btn-danger' 
                                            onClick={()=>decreaseQuantity(item.product, item.quantity)}>
                                                -</button>
                                            <input type='text' className='px-2 text-center' value={item.quantity} readOnly style={{ width: '50px' }} />
                                            <button className='btn btn-info' 
                                            onClick={()=>increaseQuantity(item.product, item.quantity, item.stock)}>
                                                +</button>
                                        </div>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={()=>removeFromCart(item.product, item.name)}>
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>

                            })
                        }


                    </tbody>
                </table>
                <div className='container mx-auto my-3'>
                    <Link to='/confirmorder'><button className='btn btn-warning'>Confirm Order</button></Link>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Cart