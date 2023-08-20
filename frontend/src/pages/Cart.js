import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Checkmark } from 'react-checkmark';
import { toast } from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Layout/Modal';
import { useStore } from '../context/Store';
import { useAuth } from '../context/auth';
import products from './productData';

const Cart = () => {
    const [cartItems,setCartItems] = useStore();
    const [total,setTotal] = useState(0);
    const [auth] = useAuth();
    const [showModal,setShowModal] = useState(false);
    const [pending,setPending] = useState(false);
    const [error,setError] = useState('');
    const [userAccountNo,setUserAccountNo] = useState('');
    const [secret,setSecret] = useState(null);
    const [secretMatch,setSecretMatch] = useState(false);
    var timer = null;

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
            setShowModal(true);
            setSecretMatch(true);
            if(!secret){
                setSecretMatch(false);
                setError('Secret key does not match');
                return;
            }
            const {data:match} = await axios.get(`http://localhost:8082/api/bank/checkBalance/${userAccountNo}/${secret}`);
            if(match?.success){
                setSecretMatch(false);
                setPending(true);
                const {data} = await axios.post('http://localhost:8080/api/buy',{
                    userEmail:auth.user.email,
                    userAccountNo:userAccountNo,
                    transactionAmount:total
                });
                console.log(data);
                if(data?.success){
                    setPending(false);
                    timer = setTimeout(()=>{
                        fetchCartItems();
                    },1000);
                }
                else{
                    setPending(false);
                    setError(data.message);
                }
            }
            else{
                setSecretMatch(false);
                setError('Secret key does not match');
            }
        } catch (error) {
            console.log(error);
            setSecretMatch(false);
            setPending(false);
            setError('Could not make the checkout.Try Again!');
        }
    };

    const fetchUserAccountNo = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8082/api/bank/checkForEmail/${auth.user.email}`);
            if(data?.success){
                setUserAccountNo(data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error in getting user account no');
        }
            
    }

    useEffect(()=>{
        if(auth.user)
            fetchUserAccountNo();
    },[auth.user]);

    useEffect(()=>{
        const updatedTotal = cartItems.reduce((a,item) => a+item.quantity*products[item.productId].price, 0);
        setTotal(updatedTotal);
    },[cartItems]);

    useEffect(()=>{
        if(auth.user)
            fetchCartItems();
        return () => timer?clearTimeout(timer):null;
    },[]);

    return (
        <Layout>
            {
                cartItems.length>0 ? (
                    <>
                        {
                            showModal && <Modal setShowModal={setShowModal}>
                                {
                                    secretMatch?(
                                        <div className='d-flex justify-content-center'>
                                            <ClipLoader
                                                color='green'
                                                size={150}
                                            />
                                            <div className='mt-5 mx-3 fw-bold'>Matching your secret key....</div>
                                        </div>
                                    ):(
                                        pending ? (
                                            <div className='d-flex justify-content-center'>
                                                <ClipLoader
                                                    color='green'
                                                    size={150}
                                                />
                                                <div className='mt-5 mx-3 fw-bold'>Your order is being processed....</div>
                                            </div>
                                        ):(
                                            error.length>0 ? (
                                                <Alert severity="error">{error}</Alert>
                                            ):(
                                                <div className='d-flex'>
                                                    <Checkmark size='xxLarge' />
                                                    <div className='mt-4 me-5 pe-4 fw-bold'>Product Supplied</div>
                                                </div>
                                            )
                                        )
                                    )
                                }
                            </Modal>
                        }
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
                                <div className='mx-2'><input type='password' value={secret} placeholder='Type your bank secret' className='form-control' onChange={(e)=>setSecret(e.target.value)}/></div>
                                <div className="px-5 mx-3 py-3 fw-bold">
                                    <button className="bg-dark bg-gradient border p-3 text-white" onClick={()=>handleCheckOut()}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </>
                ):(
                    <div className="d-flex justify-content-center align-items-center min-vh-100">
                        <div className="fw-bold ">Cart is empty</div>
                    </div>
                )
            }
        </Layout>
    )
}

export default Cart