import React from 'react'
import Carousel from './Carousel'
import Slider from 'react-slick'
import TopProducts from './TopProduct'

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Carousel />
            <Slider />
            <TopProducts />

        </div>
    )
}
