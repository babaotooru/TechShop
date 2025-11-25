import React from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Footer from '../components/Footer'
import Cart from '../pages/Cart'
import Services from '../components/Services'
import AllProductsPage from '../pages/AllProductsPage'
import ProductDetails from '../pages/ProductDetails'
import { ToastContainer } from 'react-toastify'

export default function Navigation() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />
            <Navbar />
            <div className='mt-10'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/Allproducts' element={<AllProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
            </div>
            {/* <AllProductsPage /> */}
            <Services />
            <Footer />
        </>
    )
}
