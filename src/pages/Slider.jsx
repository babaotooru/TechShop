import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Load images from PUBLIC folder
const images = [
    "/images/products/jbl760nc-1.png",
    "/images/products/boat203-1.png",
    "/images/products/boat518-1.png",
    "/images/products/boat255r-1.png",
    "/images/products/jbl-endu-1.png",
    "/images/products/sonyXb910n-1.png",
    "/images/products/boat131-1.png",
    "/images/products/jbl660nc-1.png",
];

const titles = [
    "JBL Tune 760NC",
    "boAt Airdopes 203",
    "boAt Rockerz 518",
    "boAt Rockerz 255",
    "JBL Endurance Run",
    "Sony WH-XB910N",
    "boAt Airdopes 131",
    "JBL Live 660NC",
];

const prices = ["5999", "1074", "1299", "899", "15999", "13489", "1099", "9999"];
const oldPrices = ["7999", "3999", "3999", "2999", "27999", "19990", "2990", "14999"];

export default function Slider() {
    // Duplicate array to create infinite loop
    const sliderItems = images.map((img, i) => ({
        img,
        title: titles[i],
        price: prices[i],
        old: oldPrices[i],
    }));

    const infiniteSlides = [...sliderItems, ...sliderItems, ...sliderItems]; // 3X duplicate

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 2200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-black py-20">

            {/* Heading */}
            <h1 className="text-center text-white text-3xl md:text-4xl font-semibold mb-12">
                Featured Products
            </h1>

            {/* Slider wrapper */}
            <div className="overflow-hidden w-full flex justify-center">

                <div
                    className="flex gap-10 transition-transform duration-[1500ms] ease-linear"
                    style={{
                        transform: `translateX(-${index * 240}px)`,
                    }}
                >
                    {infiniteSlides.map((item, i) => {
                        // Find center card: index + 2 (middle of 5 visible)
                        const centerIndex = index + 2;
                        const scale = i === centerIndex ? "scale-125" : "scale-100";

                        return (
                            <div
                                key={i}
                                className={`bg-neutral-900 p-5 border border-neutral-700 rounded-xl 
                text-center min-w-[220px] transition-transform duration-500 ${scale}`}
                            >
                                <p className="text-white text-sm opacity-80 mb-1">{item.title}</p>

                                <Link to="/Allproduct">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="h-32 object-contain mx-auto hover:scale-110 transition-transform duration-300"
                                    />
                                </Link>

                                <p className="text-white text-lg font-semibold mt-2">
                                    ₹{item.price}
                                    <span className="text-gray-500 ml-2 text-sm line-through">₹{item.old}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: sliderItems.length }).map((_, i) => (
                    <span
                        key={i}
                        className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${i === index % sliderItems.length ? "bg-red-600 scale-125" : "bg-gray-500"}
            `}
                    ></span>
                ))}
            </div>
        </div>
    );
}
