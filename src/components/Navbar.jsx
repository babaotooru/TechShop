import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
    // const Header = () => {
    //     const [showModal, setShowModal] = useState(false);
    // };
    return (
        <>
            {/* Navbar */}
            <nav className="bg-black text-white px-4 py-3">
                <div className="flex justify-between items-center flex-wrap">
                    <Link to="/" className="text-xl font-bold">Tech-Shop</Link>
                    <div className="flex items-center gap-6">
                        <button><FaSearch size={20} /></button>
                        <Link className="relative"><FaShoppingCart size={22} /></Link>
                        <div>
                            <FaUser size={22} className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
