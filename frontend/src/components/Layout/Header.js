import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">Ecommerce</NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavLink to="/" className="nav-link" aria-current="page" href="#">Product</NavLink>
                            <NavLink to="/cart" className="nav-link" href="#">Cart</NavLink>
                            <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
                            <NavLink to="/signup" className="nav-link" href="#">SignUp</NavLink>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header