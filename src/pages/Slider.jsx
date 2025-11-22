import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ⭐ Replace with your actual images
import img1 from "../images/products/jbl760nc-1.png";
import img2 from "../images/products/boat203-1.png";
import img3 from "../images/products/boat518-1.png";
import img4 from "../images/products/boat255r-1.png";
import img5 from "../images/products/jbl-endu-1.png";

export default function Slider() {
    const slides = [
        { img: img1, title: "JBL Tune 760NC", price: "5,999", old: "7,999" },
        { img: img2, title: "boAt Airdopes 203", price: "1,074", old: "3,999" },
        { img: img3, title: "boAt Rockerz 518", price: "1,299", old: "3,999" },
        { img: img4, title: "boAt Rockerz 255", price: "899", old: "2,999" },
        { img: img5, title: "JBL Endurance Run", price: "15,999", old: "27,999" },
    ];

    const trackRef = useRef(null);
    const [current, setCurrent] = useState(0);

    // Auto-slide logic
    useEffect(() => {
        const track = trackRef.current;
        let items = Array.from(track.children);

        const interval = setInterval(() => {
            const first = items.shift();
            items.push(first);

            track.innerHTML = "";
            items.forEach((card) => track.appendChild(card));

            setCurrent((prev) => (prev + 1) % items.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-black py-20">

            {/* ⭐ Heading exactly like screenshot */}
            <h1 className="text-center text-white text-3xl md:text-4xl font-semibold mb-12">
                Featured Products
            </h1>

            {/* ⭐ Track container */}
            <div
                ref={trackRef}
                className="flex gap-6 overflow-hidden justify-center px-4"
            >
                {slides.map((item, index) => (
                    <div
                        key={index}
                        className="
              bg-neutral-900 border border-neutral-800 
              p-5 rounded-xl min-w-[220px] text-center 
              hover:scale-105 transition-transform duration-300
            "
                    >
                        <p className="text-white text-sm opacity-80">{item.title}</p>

                        <Link to="/Allproduct">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-36 mx-auto my-3 object-contain
                transition-transform duration-300 hover:scale-110"
                            />
                        </Link>

                        <p className="text-white text-lg font-semibold">
                            ₹{item.price}
                            <span className="text-gray-500 line-through ml-2 text-sm">
                                ₹{item.old}
                            </span>
                        </p>
                    </div>
                ))}
            </div>

            {/* ⭐ Dots like screenshot */}
            <div className="flex justify-center mt-6 gap-3">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`
              w-3 h-3 rounded-full 
              ${i === current ? "bg-red-600 scale-125" : "bg-gray-500"}
              transition-all duration-300
            `}
                    ></div>
                ))}
            </div>
        </div>
    );
}
