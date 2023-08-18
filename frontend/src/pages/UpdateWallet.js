import React from 'react'
import Layout from '../components/Layout/Layout'
import BankSidebar from '../components/Layout/BankSidebar'

const UpdateWallet = () => {
    return (
        <Layout>
            <div className='row mt-5'>
                <div className='col-lg-4'>
                    <BankSidebar />
                </div>
                <div className='col-lg-8'>
                    <h1>Update Wallet</h1>

                    <div className='card shadow mt-5' style={{ width: '800px', height: '450px' }}>
                        <form>
                            <div class="mb-3 px-5 mt-5">
                                <label for="email" class="form-label">Account ID</label>
                                <input type="email"
                                    class="form-control"
                                    id="email"
                                    name="email"
                                    required
                                />
                                <div id="emailHelp" class="form-text">Note : Please make sure you entered account ID correctly.</div>
                            </div>
                            <div class="mb-3 px-5">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password"
                                    class="form-control"
                                    id="pwd"
                                    name="pwd"
                                    required
                                />
                            </div>
                            <div class="mb-3 px-5">
                                <label for="exampleInputEmail1" class="form-label">Add money</label>
                                <input type="text"
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