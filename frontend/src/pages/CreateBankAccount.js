import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import BankSidebar from '../components/Layout/BankSidebar'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateBankAccount = () => {
    //variables and setter functions to capture data entered in the form input field
    const [acc_id, setAccount] = useState("");
    const [secret, setSecret] = useState("");
    var [balance, setBalance] = useState("");

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            balance = Number(balance);
            console.log('Submitting:', acc_id, secret, balance);
            const res = await axios.post('http://localhost:8082/api/bank/createAccount', { acc_id, secret, balance });

            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                console.log('API Error:', res.data.message);
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in saving Bank information.');
        }
    }

    return (
        <Layout>
            <div className='row mt-5'>
                <div className='col-lg-4'>
                    <BankSidebar />
                </div>
                <div className='col-lg-8'>
                    <h1>Bank Account</h1>

                    <div className='card shadow mt-5' style={{ width: '800px', height: '450px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 px-5 mt-5">
                                <label for="text" className="form-label">Account ID</label>
                                <input type="text"
                                    value={acc_id}
                                    onChange={(e) => setAccount(e.target.value)}
                                    className="form-control"
                                    id="account"
                                    name="account"
                                    required
                                />
                                <div id="emailHelp" className="form-text">Note : Please make sure you entered account ID correctly.</div>
                            </div>
                            <div className="mb-3 px-5">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password"
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    className="form-control"
                                    id="pwd"
                                    name="pwd"
                                    required
                                />
                            </div>
                            <div className="mb-3 px-5">
                                <label for="exampleInputEmail1" className="form-label">Balance</label>
                                <input type="text"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    className="form-control"
                                    id="balance"
                                    name="balance"
                                    required
                                />
                                <div id="emailHelp" className="form-text mt-3">We'll never share your credentials and balance with anyone else.</div>
                            </div>
                            <button type="submit" className="btn btn-dark" style={{ marginLeft: '400px' }}>Submit</button>
                        </form>
                    </div>


                </div>
            </div>
        </Layout>
    )
}

export default CreateBankAccount