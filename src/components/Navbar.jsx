import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="bg-black-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-white text-2xl font-bold">
                    Tech-Shop
                </Link>

                {/* Search Bar (Desktop) */}
                <div className="hidden sm:flex items-center bg-white rounded-full px-3 py-1 w-64 shadow">
                    <FaSearch className="text-gray-500 text-lg" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="ml-2 outline-none w-full text-gray-700"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-5 text-white text-xl">
                    <FaSearch className="sm:hidden" /> {/* Mobile Search icon */}
                    <FaShoppingCart />
                    <FaUser />
                </div>

            </div>
        </nav>
    );
}
