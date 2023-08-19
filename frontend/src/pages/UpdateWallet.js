import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import BankSidebar from '../components/Layout/BankSidebar'
import toast from 'react-hot-toast';
import axios from 'axios';


const UpdateWallet = () => {
    //variables and setter functions to capture data entered in the form input field
    const [acc_id, setAccount] = useState("");
    const [secret, setSecret] = useState("");
    var [addMoney, setBalance] = useState();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            addMoney = Number(addMoney);
            console.log('Updating:', acc_id, addMoney);
            const res = await axios.post('http://localhost:8082/api/bank/addMoney', { acc_id, addMoney });

            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                console.log('API Error : ', res.data.message);
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in updating bank balance.")
        }
    }

    return (
        <Layout>
            <div className='row mt-5'>
                <div className='col-lg-4'>
                    <BankSidebar />
                </div>
                <div className='col-lg-8'>
                    <h1>Update Wallet</h1>

                    <div className='card shadow mt-5' style={{ width: '800px', height: '450px' }}>
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3 px-5 mt-5">
                                <label for="text" class="form-label">Account ID</label>
                                <input type="text"
                                    value={acc_id}
                                    onChange={(e) => setAccount(e.target.value)}
                                    class="form-control"
                                    id="account"
                                    name="account"
                                    required
                                />
                                <div id="emailHelp" class="form-text">Note : Please make sure you entered account ID correctly.</div>
                            </div>
                            <div class="mb-3 px-5">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password"
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    class="form-control"
                                    id="pwd"
                                    name="pwd"
                                    required
                                />
                            </div>
                            <div class="mb-3 px-5">
                                <label for="numberInput" class="form-label">Add money</label>
                                <input type="number"
                                    value={addMoney}
                                    onChange={(e) => setBalance(e.target.value)}
                                    class="form-control"
                                    id="balance"
                                    name="balance"
                                    required
                                />
                                <div id="emailHelp" class="form-text mt-3">We'll never share your credentials and balance with anyone else.</div>
                            </div>
                            <button type="submit" class="btn btn-dark" style={{ marginLeft: '400px' }}>Update</button>
                        </form>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default UpdateWallet