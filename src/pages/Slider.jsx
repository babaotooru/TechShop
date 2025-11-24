import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Slide content
const slides = [
    {
        img: "/images/products/jbl760nc-1.png",
        title: "JBL Tune 760NC",
        price: "5,999",
        old: "7,999",
    },
    {
        img: "/images/products/boat203-1.png",
        title: "boAt Airdopes 203",
        price: "1,074",
        old: "3,999",
    },
    {
        img: "/images/products/boat518-1.png",
        title: "boAt Rockerz 518",
        price: "1,299",
        old: "3,999",
    },
    {
        img: "/images/products/boat255r-1.png",
        title: "boAt Rockerz 255",
        price: "899",
        old: "2,999",
    },
    {
        img: "/images/products/jbl-endu-1.png",
        title: "JBL Endurance Run",
        price: "999",
        old: "1,599",
    },
];

export default function Slider() {
    const [index, setIndex] = useState(0);

    // auto sliding
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    // rotating window of 5 items
    const getVisibleSlides = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(slides[(index + i) % slides.length]);
        }
        return result;
    };

    const visibleSlides = getVisibleSlides();

    return (
        <div className="w-full bg-black py-20 px-4">
            {/* Title */}
            <h1 className="text-center text-white text-3xl md:text-4xl font-semibold mb-10">
                Featured Products
            </h1>

            {/* Slider Container */}
            <div className="flex justify-center items-center gap-6 md:gap-10 overflow-hidden">

                {visibleSlides.map((item, i) => {
                    // center index = 2
                    const isCenter = i === 2;

                    return (
                        <div
                            key={i}
                            className={`
                text-center transition-all duration-500 
                ${isCenter ? "scale-150 opacity-100" : "scale-90 opacity-70"}
                w-[110px] sm:w-[140px] md:w-[160px] lg:w-[200px]
              `}
                        >
                            <p className="text-white text-sm sm:text-base mb-2">
                                {item.title}
                            </p>

                            <Link to="/Allproduct">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="
                    mx-auto object-contain 
                    h-24 sm:h-28 md:h-32 lg:h-40 
                    transition-transform duration-300 hover:scale-110
                  "
                                />
                            </Link>

                            <p className="text-white text-base sm:text-lg font-semibold mt-2">
                                ₹{item.price}
                                <span className="text-gray-500 ml-2 text-sm line-through">
                                    ₹{item.old}
                                </span>
                            </p>
                        </div>
                    );
                })}

            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 gap-3">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={`
              w-3 h-3 rounded-full 
              ${i === index ? "bg-red-600 scale-125" : "bg-gray-500"} 
              transition-all duration-300
            `}
                    ></span>
                ))}
            </div>
        </div>
    );
}
