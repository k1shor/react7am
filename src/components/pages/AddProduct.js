import React, { useEffect, useState } from 'react'
import { viewCategories } from '../../API/categoryAPI'
import { addProduct } from '../../API/productsAPI'
import { isAuthenticated } from '../../API/userAPI'
import AdminSidebar from '../layout/AdminSidebar'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const AddProduct = () => {

    const { token } = isAuthenticated()
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        count_in_stock: '',
        product_image: '',
        category: '',
        error: '',
        success: false,
        formdata: ''
    })
    // destructuring 
    const { product_name, product_price, product_description, count_in_stock, product_image, category, error, success, formdata } = product

    useEffect(() => {
        viewCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                    setProduct({ formdata: new FormData })
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = name => event => {
        let value = name === 'product_image' ? event.target.files[0] : event.target.value
        setProduct({ ...product, [name]: value })
        formdata.set(name, value)
        console.log(product)
    }

    const clickSubmit = event => {
        event.preventDefault()
        addProduct(formdata, token)
        .then(data=>{
            if(data.error){
                setProduct({...product, error: data.error, success: false})
            }
            else{
                setProduct({success:true})
            }
        })
    }

    const showError =()=>{
        if(error){
          return <div className='alert alert-danger'>{error}</div>
        }
      }
      const showSuccess = () => {
        if(success){
          return <div className='alert alert-success'>'Product added successfully'</div>
        }
      }

    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 p-0'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9'>
                        <h3>Add Product</h3>
                        {showError()}
                        {showSuccess()}
                        <form className='mt-3 w-50 mx-auto text-start'>
                            <label htmlFor='product_name'>Product name</label>
                            <input type={'text'} id='product_name' className='form-control' onChange={handleChange('product_name')} value={product_name} />
                            <label htmlFor='product_price'>Price</label>
                            <input type={'number'} id='product_price' className='form-control' onChange={handleChange('product_price')} value={product_price} />
                            <label htmlFor='product_description'>Description</label>
                            <textarea id='product_description' className='form-control' rows={5} onChange={handleChange('product_description')} value={product_description} />
                            <label htmlFor='count'>Count in Stock</label>
                            <input type={'number'} id='count' className='form-control' onChange={handleChange('count_in_stock')} value={count_in_stock} />
                            <label htmlFor='image'>Image</label>
                            <input type={'file'} className='form-control' id='image' onChange={handleChange('product_image')} />
                            <label htmlFor='category'>Category</label>
                            <select id='category' className='form-control' onChange={handleChange('category')}>
                                <option></option>
                                {
                                    categories.map(category => {
                                        return <option key={category._id} value={category._id}>{category.category_name}</option>
                                    })
                                }
                            </select>
                            <button className='btn btn-warning form-control mt-3' onClick={clickSubmit}>Add Product</button>
                        </form>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddProduct