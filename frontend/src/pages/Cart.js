import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';

const Cart = () => {

    return (
        <Layout>
            <h2 className='flex d-flex mt-5 mb-5 px-5'>Products selected</h2>
            <div class="flex d-flex mt-2 px-5">
                <div className='col-lg-12'>
                    <table className="table table-primary table-hover">
                        <thead>
                            <th>Product Name</th>
                            <th>Number of items</th>
                            <th>Price</th>
                        </thead>
                        <tbody>


                        </tbody>
                    </table>
                </div>

            </div>

        </Layout>
    )
}

export default Cart