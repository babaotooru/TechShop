import React, { useContext, useState } from "react";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addToCart } from "../ReduxStore/productSlice";
import { globalContext } from "../mycontext/MyContext";

const TopProducts = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const { data } = useContext(globalContext);
    const dispatch = useDispatch();

    const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];

    if (!data || data.length === 0) {
        return (
            <div className="text-center text-white p-4 bg-neutral-900">
                Loading Top Products...
            </div>
        );
    }

    const filteredProducts = data.filter((product) => {
        if (activeCategory === "All") return true;
        return product.category === activeCategory;
    });

    const displayedProducts =
        activeCategory === "All" ? filteredProducts.slice(0, 11) : filteredProducts;

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <div className="w-full px-4 bg-neutral-900 pb-10">
            <h3 className="text-center text-white text-3xl font-bold py-6">
                Top Products
            </h3>

            {/* Category Buttons */}
            <div className="max-w-7xl mx-auto px-4 text-center mb-6 flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2 rounded-full text-white border transition-all
              ${activeCategory === category
                                ? "bg-red-600 border-red-700 shadow-lg scale-105"
                                : "border-gray-500 hover:bg-gray-700"
                            }
            `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {displayedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-neutral-800 rounded-xl shadow-lg p-4 border border-gray-700 hover:shadow-xl transition-all"
                    >
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-52 object-contain rounded-lg bg-neutral-900 p-3 hover:scale-110 transition-transform duration-300"
                            />
                        </Link>

                        {/* PRODUCT INFO */}
                        <div className="mt-3">
                            {/* Rating */}
                            <div className="flex text-yellow-400 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="fa-solid fa-star text-sm"></i>
                                ))}
                            </div>

                            <h5 className="text-lg font-semibold text-white">{product.title}</h5>
                            <p className="text-gray-300 text-sm">{product.info}</p>

                            <hr className="border-gray-700 my-2" />

                            <h4 className="text-xl font-bold text-white">
                                ₹{product.finalPrice}
                                <span className="ml-2 text-gray-500 line-through text-base">
                                    ₹{product.originalPrice}
                                </span>
                            </h4>

                            {/* Add to Cart */}
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 w-full rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition"
                            >
                                <i className="fa-solid fa-cart-shopping text-sm"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}

                {activeCategory === "All" && (
                    <Link
                        to="/Allproducts"
                        className="bg-neutral-800 rounded-xl border border-gray-700 flex flex-col items-center justify-center text-white text-center p-6 hover:bg-neutral-700 transition"
                    >
                        <h2 className="text-xl font-semibold">
                            Browse all Products
                            <br />
                            <i className="fa-solid fa-arrow-right-long mt-2 text-red-400"></i>
                        </h2>
                    </Link>
                )}

            </div>
        </div>
    );
};

export default TopProducts;
