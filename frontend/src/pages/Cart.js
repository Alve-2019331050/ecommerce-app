import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Layout from '../components/Layout/Layout';
import { useStore } from '../context/Store';
import { useAuth } from '../context/auth';
import products from './productData';

const Cart = () => {
    const [cartItems,setCartItems] = useStore();
    const [total,setTotal] = useState(0);
    const [auth] = useAuth();

    const fetchCartItems = async() => {
        const {data} = await axios.get(`http://localhost:8080/api/cart/get-items/${auth.user.email}`);
        if(data?.success){
            const products = data.items;
            const updatedCartItems = products.map(({productId,quantity}) => {return({productId,quantity});});
            setCartItems(updatedCartItems);
        }
    }

    const decrement = async(item) => {
        try {
            if(item.quantity === 1){
                toast.error('quantity can not be less than 1');
            }
            else{
                const {data} = await axios.post('http://localhost:8080/api/cart/decrease-quantity',{
                    userEmail:auth.user.email,
                    productId:item.productId
                });
                if(data?.success === false){
                    toast.error('Could not decrease quantity');
                }
                else{
                    fetchCartItems();
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Could not decrease quantity');
        }
    };

    const increment = async(item) => {
        try {
            const {data} = await axios.post('http://localhost:8080/api/cart/increase-quantity',{
                userEmail:auth.user.email,
                productId:item.productId
            });
            if(data?.success === false){
                toast.error('Could not increase quantity');
            }
            else{
                fetchCartItems();
            }
        } catch (error) {
            console.log(error);
            toast.error('Could not increase quantity');
        }
    };

    const handleCheckOut = async() => {
        try {
            const {data} = await axios.post('http://localhost:8080/api/buy',{
                userEmail:auth.user.email,
                userAccountNo:123456,//tobechanged
                transactionAmount:total
            });
            if(data?.success){
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Could not make the checkout.Try Again!');
        }
    };

    useEffect(()=>{
        const updatedTotal = cartItems.reduce((a,item) => a+item.quantity*products[item.productId].price, 0);
        setTotal(updatedTotal);
    },[cartItems])
    return (
        <Layout>
            <h2 className='flex d-flex mt-5 mb-5 px-5'>Products selected</h2>
            <div class="flex d-flex mt-2 px-5">
                <div className='col-lg-9'>
                    <table className="table table-primary table-hover">
                        <thead>
                            <th className='px-2'>Product Name</th>
                            <th>Number of items</th>
                            <th className='px-3'>Price</th>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item,index) => 
                                    <tr key={index}>
                                        <td>
                                            <img src={products[item.productId].imageSrc} alt={products[item.productId].name} width={50} height={50} />
                                            &nbsp;&nbsp;
                                            {products[item.productId].name}
                                        </td>
                                        <td>
                                            <button className='border-0 bg-transparent mx-2 my-2' onClick={()=>decrement(item)}><FaMinus/></button>
                                            {item.quantity}
                                            <button className='border-0 bg-transparent mx-2 my-2' onClick={()=>increment(item)}><FaPlus/></button>
                                        </td>
                                        <td>Tk.{products[item.productId].price}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-1"/>
                <div className="card shadow col-lg-2">
                    <div className="py-3 px-3 fw-bold">
                        Total ({cartItems.reduce((a,item) => a+item.quantity,0)})
                            {' '}
                            : Tk. {' '} 
                            {total}
                    </div> 
                    <div className="px-5 mx-3 py-3 fw-bold">
                        <button className="bg-dark bg-gradient border p-3 text-white" onClick={()=>handleCheckOut}>Check Out</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart