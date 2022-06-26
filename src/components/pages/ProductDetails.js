import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findProduct, findRelated } from '../../API/productsAPI'
import { isAuthenticated } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Products from '../Products'

const ProductDetails = () => {
    const { user } = isAuthenticated()

    const params = useParams()
    const id = params.id

    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        findProduct(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
            .catch(err => console.log(err))
        findRelated(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setRelatedProduct(data)
                }
            })
            .catch(err => console.log(err))
    }, [params])

    return (
        <>
            <Navbar />
            <div className='container my-5 p-5 d-flex mx-auto shadow-lg'>
                <div className='img-container w-50'>
                    <img src={`http://localhost:5000/${product.product_image}`} alt={product.product_name} className='w-100 h-100' />
                </div>
                <div className='product-info w-50 text-start p-5 mt-5 border-start border-5'>
                    <h3 className="card-title">{product.product_name}</h3>
                    <h3 className="card-title">Rs. {product.product_price}</h3>
                    <p className="text-truncate">Description: {product.product_description}</p>
                    <h4>In Stock: {product.count_in_stock}</h4>
                    {
                        (user && user.role === 1) ?
                            <button className='btn btn-warning'>Update Product</button>
                            :
                            <button className='btn btn-warning'>Add to Cart</button>
                    }

                </div>
            </div>
            <div className='container mx-auto'>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {
                                    relatedProduct.slice(0,4).map(product => {
                                        return <Products product={product} key={product._id}/>
                                    })
                                }
                            </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetails