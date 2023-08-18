import React from 'react'
import {
    MdOutlineAccountBalance,
    MdOutlineAccountBalanceWallet
} from 'react-icons/md'
import { NavLink } from 'react-router-dom';

const BankSidebar = () => {
    return (
        <div className='card shadow-lg rounded' style={{ marginLeft: '80px', marginRight: '100px' }}>
            <nav className="nav flex-column">

                <NavLink to="/bankinfo" className="nav-link active" href="#"><MdOutlineAccountBalance size="30px" />  Create Account</NavLink>
                <hr />
                <NavLink to="/updatewallet" className="nav-link" href="#"><MdOutlineAccountBalanceWallet size="30px" />  Update Wallet</NavLink>

            </nav>
        </div>
    )
}

export default BankSidebar