import React from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Footer from '../components/Footer'
import Cart from '../pages/Cart'
import Services from '../components/Services'
import AllProductsPage from '../pages/AllProductsPage'
import ProductDetails from '../pages/ProductDetails'

export default function Navigation() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/Allproducts' element={<AllProductsPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <AllProductsPage />
            <Services />
            <Footer />
        </>
    )
}
