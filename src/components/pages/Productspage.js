import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Products from '../Products'
import { Container } from '@mui/material'
import Checkbox_category from '../Checkbox_category'
import RadioButton from '../RadioButton'
import { prices } from '../prices'
import { filterProduct } from '../../API/productsAPI'
// import {StarIcon, StarBorderIcon} from '@mui/icons-material'

const Productspage = () => {
    const [sortBy, setSortBy] = useState('createdAt')
    const [order, setOrder] = useState('1')
    const [limit, setLimit] = useState(8)
    const [skip, setSkip] = useState(0)

    const [filteredProduct, setFilteredProduct] = useState([])
    const [size, setSize] = useState(0)

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], product_price: [] }
    })

    useEffect(() => {
        filterProduct(sortBy, order, limit, skip, myFilters)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setFilteredProduct(data.product)
                    setSize(data.size)
                }
            })
            .catch(err => console.log(err))
    }, [myFilters])

    const handleFilters = (filters, filterBy) => {
        const newFilter = { ...myFilters }
        newFilter.filters[filterBy] = filters
        // category: mobile_id -> filters:mobile_id, filterBy: category
        // price: price_id -> filters: price_id(0, 1, 2, 3, 4, 5), filterBy: price
        if (filterBy === 'product_price') {
            newFilter.filters[filterBy] = handlePrice(filters)
        }
        setMyFilters(newFilter)
        console.log(newFilter)
    }

    const handlePrice = (index) => {
        const data = prices
        const price = data.find(price => price.id == index)
        return price.value
    }

    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Checkbox_category handleFilters={handleFilters} />
                        <RadioButton handleFilters={handleFilters} />
                    </div>
                    <div className='col-md-9'>

                        <div className='container mx-auto mt-5'>
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {
                                    filteredProduct.map(product => {
                                        return <Products product={product} key={product._id}/>
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </Container>


            <Footer />

        </>
    )
}

export default Productspage