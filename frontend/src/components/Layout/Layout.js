import React from 'react'
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';


const Layout = (props) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                <Toaster />
                {props.children}
            </main>
            <Footer />

        </div>
    )
}

export default Layout