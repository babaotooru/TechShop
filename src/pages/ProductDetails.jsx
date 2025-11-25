import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import reviewsData from "../data/reviewsData"; // ⬅️ NEW
import { globalContext } from "../mycontext/MyContext";
import { addToCart } from "../ReduxStore/productSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const { data } = useContext(globalContext);
    const dispatch = useDispatch();

    const product = data.find((item) => item.id.toString() === id);

    const [activeTab, setActiveTab] = useState("specs");
    const [mainImage, setMainImage] = useState("");
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (product) {
            setMainImage(product.images?.[0] || product.image);

            const filtered = data.filter(
                (p) => p.category === product.category && p.id !== product.id
            );
            setRelatedProducts(filtered);
        }
    }, [product, data]);

    if (!product) {
        return <h1 className="text-center text-red-500 text-3xl mt-10">Product Not Found</h1>;
    }

    return (
        <div className="bg-black min-h-screen text-white">

            {/* ---------- PRODUCT SECTION ---------- */}
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">

                {/* LEFT: IMAGES */}
                <div className="flex gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                onClick={() => setMainImage(img)}
                                className="w-20 h-20 object-contain border border-white rounded cursor-pointer hover:scale-110 transition"
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <img
                        src={mainImage}
                        className="w-[50vw] max-w-[550px] rounded-lg bg-neutral-900 p-4 object-contain"
                    />
                </div>

                {/* RIGHT: DETAILS */}
                <div className="flex flex-col gap-4 max-w-xl">

                    <h2 className="text-3xl font-bold">{product.title}</h2>
                    <p className="text-gray-300">{product.info}</p>

                    {/* Ratings */}
                    <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-orange-500" />
                        ))}
                        <span className="text-gray-400">| {product.ratings} Ratings</span>
                    </div>

                    <hr className="border-gray-600" />

                    {/* PRICE INFO */}
                    <div>
                        <span className="text-4xl font-bold">₹{product.finalPrice}</span>
                        <span className="line-through text-gray-500 ml-3 text-lg">
                            ₹{product.originalPrice}
                        </span>

                        <p className="text-green-400 text-sm mt-2">Inclusive of all taxes</p>
                    </div>

                    <hr className="border-gray-600" />

                    {/* Offers */}
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Offers</h3>
                        <div className="flex gap-3 flex-wrap">
                            <p className="border border-white px-3 py-1 rounded">
                                No Cost EMI on Credit Card
                            </p>
                            <p className="border border-white px-3 py-1 rounded">
                                Pay Later & Cashback
                            </p>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={() => {
                            dispatch(addToCart(product));
                            toast.success("✅ Added to cart", {
                                position: "top-right",
                                autoClose: 2000,
                                pauseOnHover: true,
                                draggable: true,
                                style: {
                                    marginTop: "80px",
                                    zIndex: 9999,
                                },
                            });
                        }}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* ---------- TABS SECTION ---------- */}
            <div className="w-full bg-neutral-900 py-10">
                <div className="flex justify-center gap-6 mb-6">
                    {["specs", "overview", "reviews"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded text-lg font-semibold transition 
                            ${activeTab === tab ? "bg-orange-500" : "bg-neutral-700"}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* ---------- TAB CONTENT ---------- */}
                <div className="max-w-4xl mx-auto text-white px-6">

                    {/* SPECS */}
                    {activeTab === "specs" && (
                        <div className="grid grid-cols-2 gap-3 text-gray-300 text-lg">
                            <p>Brand</p><p>{product.brand}</p>
                            <p>Model</p><p>{product.title}</p>
                            <p>Generic Name</p><p>{product.category}</p>
                            <p>Type</p><p>{product.type}</p>
                            <p>Connectivity</p><p>{product.connectivity}</p>
                            <p>Microphone</p><p>Yes</p>
                        </div>
                    )}

                    {/* OVERVIEW */}
                    {activeTab === "overview" && (
                        <div className="leading-7 text-gray-300">
                            <h2 className="text-2xl font-bold mb-3">Overview</h2>
                            <p>
                                The <span className="text-red-400 font-bold">{product.title}</span> offers
                                exceptional sound, comfort and long-lasting battery life.
                                Designed for premium audio lovers.
                            </p>
                            <ul className="list-disc ml-6 mt-3">
                                <li>Perfect Sound Quality</li>
                                <li>Comfortable to Wear</li>
                                <li>Long Playback Time</li>
                            </ul>
                        </div>
                    )}

                    {/* REVIEWS */}
                    {activeTab === "reviews" && (
                        <div className="space-y-6">
                            {reviewsData.map((review) => (
                                <div key={review.id} className="flex gap-4 bg-neutral-800 p-4 rounded-lg">
                                    <div className="flex flex-col gap-1">
                                        <div className="font-bold">{review.name}</div>
                                        <div className="text-gray-400 text-sm">{review.date}</div>
                                        <div className="flex">
                                            {[...Array(review.rateCount)].map((_, i) => (
                                                <FaStar key={i} className="text-orange-500" />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 mt-2">{review.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ---------- RELATED PRODUCTS ---------- */}
            <h3 className="text-center text-2xl font-bold mt-10 mb-4">Related Products</h3>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {relatedProducts.map((prod) => (
                    <Link key={prod.id} to={`/product/${prod.id}`} className="bg-neutral-900 p-4 rounded-lg shadow hover:scale-105 transition">
                        <img
                            src={prod.images[0]}
                            className="w-full h-48 object-contain"
                        />
                        <h4 className="text-xl font-semibold mt-2">{prod.title}</h4>
                        <p className="text-gray-400">{prod.info}</p>

                        <div className="mt-2">
                            <span className="text-lg font-bold">₹{prod.finalPrice}</span>
                            <span className="ml-2 text-gray-500 line-through">₹{prod.originalPrice}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
