import React, { useState, useRef, useContext } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalContext } from "../mycontext/MyContext";


const Header = () => {
    const cart = useSelector((state) => state.cartItems.cart);
    const cartCount = cart.length;

    const { data: products } = useContext(globalContext);

    const [showModal, setShowModal] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(true);

    const signupRef = useRef(null);
    const loginRef = useRef(null);

    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            {/* Navbar */}
            <nav className=" fixed top-0 left-0 w-full z-[9999] bg-black text-white px-4 py-3">
                <div className="flex justify-between items-center flex-wrap">
                    <a href="/" className="text-xl font-bold">
                        Tech-Shop
                    </a>

                    <div className="flex items-center gap-6">
                        {/* Search */}
                        <button onClick={() => setSearchOpen(!searchOpen)}>
                            <FaSearch size={20} />
                        </button>

                        {/* Cart */}
                        <Link to="/cart" className="relative">
                            <FaShoppingCart size={22} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex justify-center items-center">
                                {cartCount}
                            </span>
                        </Link>

                        {/* User */}
                        <div className="relative">
                            <FaUser
                                size={22}
                                className="cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 bg-gray-900 text-white p-4 rounded shadow-lg w-72 z-50">
                                    <h4 className="mb-1 text-lg">Hello!</h4>
                                    <p className="mb-3 text-sm text-gray-300">
                                        Access your account and manage orders
                                    </p>
                                    <button
                                        className="w-full bg-red-600 py-2 rounded mb-3"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Login / Signup
                                    </button>
                                    <hr className="border-gray-600 my-3" />
                                    <p className="text-sm text-gray-400">Please Login</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* SEARCH BAR */}
            {searchOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 w-1/2 bg-black p-4 rounded shadow-xl top-20 z-50">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchText}
                            placeholder="Search..."
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none"
                        />

                        {searchText && (
                            <button
                                onClick={() => {
                                    setSearchText("");
                                    setSearchOpen(false);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                            >
                                ✖
                            </button>
                        )}
                    </div>

                    {/* Results */}
                    {searchText && filteredProducts.length > 0 && (
                        <ul className="mt-3 bg-gray-900 rounded divide-y divide-gray-800 border border-gray-700">
                            {filteredProducts.map((p) => (
                                <Link
                                    key={p.id}
                                    to={`/product/${p.id}`}
                                    onClick={() => {
                                        setSearchText("");
                                        setSearchOpen(false);
                                    }}
                                >
                                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        {p.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}

                    {searchText && filteredProducts.length === 0 && (
                        <p className="text-gray-400 mt-2 text-sm">No products found</p>
                    )}
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-gray-900 text-white w-96 rounded-xl p-6 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-300"
                        >
                            ✖
                        </button>

                        {isSignup ? (
                            <div ref={signupRef}>
                                <h3 className="text-center text-xl font-bold mb-4">Sign Up</h3>

                                <button
                                    className="w-full bg-white text-black py-2 rounded mb-3"
                                    onClick={() => setIsSignup(false)}
                                >
                                    Already have an account?{" "}
                                    <span className="text-blue-500 font-bold">Login</span>
                                </button>

                                <form className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="w-full bg-gray-800 py-2 px-3 rounded outline-none"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-gray-800 py-2 px-3 rounded outline-none"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full bg-gray-800 py-2 px-3 rounded outline-none"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full bg-gray-800 py-2 px-3 rounded outline-none"
                                    />

                                    <button className="w-full bg-red-600 py-3 text-lg rounded">
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div ref={loginRef}>
                                <h3 className="text-center text-xl font-bold mb-4">Login</h3>

                                <button
                                    className="w-full bg-white text-black py-2 rounded mb-3"
                                    onClick={() => setIsSignup(true)}
                                >
                                    Don’t have an account?{" "}
                                    <span className="text-blue-500 font-bold">Sign Up</span>
                                </button>

                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-gray-800 py-2 px-3 rounded outline-none"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full bg-gray-800 py-2 px-3 rounded outline-none"
                                    />

                                    <button className="w-full bg-red-600 py-3 text-lg rounded">
                                        Login
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="text-center my-4 text-gray-400">or login with</div>

                        <div className="flex gap-2">
                            <button className="w-full bg-blue-700 py-2 rounded">Facebook</button>
                            <button className="w-full bg-red-600 py-2 rounded">Google</button>
                            <button className="w-full bg-blue-500 py-2 rounded">Twitter</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
