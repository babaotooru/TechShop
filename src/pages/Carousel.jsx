import React from "react";
import Slider from "react-slick";
import { SliderData } from "../projectData/SliderData";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        cssEase: "ease-in-out",
        appendDots: dots => (
            <div className="mt-8">
                <ul className="flex justify-center gap-3">{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-3 h-3 bg-gray-500 rounded-full hover:bg-red-500 transition-all"></div>
        )
    };

    return (
        <div className="w-full bg-black py-16 overflow-hidden">
            <Slider {...settings}>
                {SliderData.map((item) => (
                    <div key={item.id} className="relative px-4 min-h-[600px]">

                        {/* BACKGROUND BIG TEXT */}
                        <h2 className="
                            absolute inset-0 flex items-center justify-center
                            text-white/5 font-extrabold uppercase
                            text-[6rem] md:text-[12rem] lg:text-[16rem]
                            select-none pointer-events-none tracking-widest
                        ">
                            {item.type}
                        </h2>

                        {/* MAIN CONTENT */}
                        <div className="
                            max-w-7xl mx-auto flex flex-col md:flex-row 
                            items-center justify-between py-10 relative z-10
                        ">

                            {/* LEFT TEXT */}
                            <div className="w-full md:w-1/2 space-y-4 px-4">
                                <h1 className="text-4xl md:text-6xl font-bold text-white">
                                    {item.title}
                                </h1>

                                <p className="text-lg md:text-2xl text-gray-300">
                                    {item.tagline}
                                </p>

                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    ₹{item.finalPrice}
                                    <span className="ml-4 text-gray-500 line-through text-lg">
                                        ₹{item.originalPrice}
                                    </span>
                                </h3>

                                <Link to={`/product/${item.id}`}>
                                    <button className="
                                        bg-red-600 hover:bg-red-700 text-white 
                                        px-6 py-3 rounded-md font-bold shadow-lg 
                                        transition-all
                                    ">
                                        Shop Now
                                    </button>
                                </Link>
                            </div>

                            {/* RIGHT IMAGE */}
                            <div className="w-full md:w-[45%] flex justify-center md:justify-end">
                                <img
                                    src={item.images}  // Correct (your images are strings)
                                    alt={item.title}
                                    className="
                                        w-full md:h-[520px] h-[340px] object-contain
                                        drop-shadow-2xl transition-transform duration-500 
                                        hover:scale-110
                                    "
                                />
                            </div>

                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
