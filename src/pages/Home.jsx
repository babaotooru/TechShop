import React from 'react';
import Carousel from './Carousel';
import Slider from './Slider';   // ✅ your Featured Products slider
import TopProducts from './TopProduct';

export default function Home() {
    return (
        <div>
            <Carousel />
            <Slider />
            <TopProducts />
        </div>
    );
}
