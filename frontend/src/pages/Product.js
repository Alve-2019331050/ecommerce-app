import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import { useStore } from '../context/Store';
import { useAuth } from '../context/auth';
// import { Link } from 'react-router-dom';
// // import products from './productData';
// import Cart from './Cart';

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
    const [cartItems,setCartItems] = useStore();
    const [auth] = useAuth();

    //function to handle toggle
    const handleToggle = async(index) => {
        try {
            if(!auth.user){
                toast.error('You need to be logged in');
            }
            else{
                const updatedToggledProducts = [...toggledProducts];
                if (updatedToggledProducts.includes(index)) {
                    const {data} = await axios.delete(`http://localhost:8080/api/cart/remove-product/${auth.user.email}/${index}`);
                    if(data?.success){
                        toast.success('Removed this product from cart');
                        updatedToggledProducts.splice(updatedToggledProducts.indexOf(index), 1);
                    }
                    else{
                        toast.error('Could not remove the product');
                    }
                } else {
                    const {data} = await axios.post('http://localhost:8080/api/cart/insert-product',{
                        userEmail:auth.user.email,
                        productId:index
                    });
                    if(data?.success){
                        toast.success('Added this product in cart');
                        updatedToggledProducts.push(index);
                    }
                    else{
                        toast.error('Could not add the product');
                    }
                }
                setToggledProducts(updatedToggledProducts);
            }
        } catch (error) {
            console.log(error);
            toast.error('Could not remove the product');
        }
    };

    const fetchCartItems = async() => {
        const {data} = await axios.get(`http://localhost:8080/api/cart/get-items/${auth.user.email}`);
        if(data?.success){
            const products = data.items;
            const updatedToggledProducts = products.map(({productId}) => productId);
            setToggledProducts(updatedToggledProducts);
            const updatedCartItems = products.map(({productId,quantity}) => {return({productId,quantity});});
            setCartItems(updatedCartItems);
        }
    }

    //fetching all the cart items when the page is loaded
    useEffect(() => {
        if(auth.user)
            fetchCartItems();
    },[auth.user]);

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