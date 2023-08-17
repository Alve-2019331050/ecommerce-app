import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';
// import products from './productData';
import Cart from './Cart';

//declaring three products

const products = [
    {
        name: 'Veloce Legion 10',
        imageSrc: '/cycle.jpg',
        price: '18000',
    },
    {
        name: 'Hatil Reading Table',
        imageSrc: '/table.jpg',
        price: '10200',
    },
    {
        name: 'Samsung s22 ultra 5G',
        imageSrc: '/phone.jpg',
        price: '160999',
    },
];

const Product = () => {
    //useState hook
    // will individually check if a product has been added or not
    const [toggledProducts, setToggledProducts] = useState([]);

    //function to handle toggle
    const handleToggle = (index) => {
        const updatedToggledProducts = [...toggledProducts];
        if (updatedToggledProducts.includes(index)) {
            updatedToggledProducts.splice(updatedToggledProducts.indexOf(index), 1);
        } else {
            updatedToggledProducts.push(index);
        }
        setToggledProducts(updatedToggledProducts);
    };

    return (
        <Layout>
            <div class="row flex d-flex mt-5 px-5">
                {products.map((products, index) => (
                    <div class="col-lg-4" key={index}>
                        <div className="card shadow-lg" style={{ width: '390px', border: "1px solid black" }}>
                            <img src={products.imageSrc} alt={products.name} height={'300px'} width={'390px'} />
                            <div className="card-body">
                                <h5 className="card-title">{products.name}</h5>
                                <p className="card-text">{products.price} /=</p>
                                <a href="#"
                                    className={`btn ${toggledProducts.includes(index) ? 'btn-danger' : 'btn-dark'}`}
                                    onClick={() => handleToggle(index)}
                                >
                                    {toggledProducts.includes(index) ? 'Added' : 'Add to cart'}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </Layout>
    )
}

export default Product