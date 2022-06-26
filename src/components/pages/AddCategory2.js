import React from 'react'

const AddCategory2 = () => {
    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 p-0'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='container w-50 mt-5 p-5'>
                            <h3>Add Category</h3>
                            <form>
                                <label htmlFor='category_name'>Category Name:</label>
                                <input type={'text'} id='category_name' className='form-control'/>
                                <button className='btn btn-warning form-control'>Add Category</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddCategory2