import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white px-6 py-10 mt-0">
            <div className="max-w-7xl mx-auto">

                {/* GRID — Automatically stacks on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    {/* COLUMN 1 */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-4">Tech-Shop</h1>

                        <p className="text-gray-300 mb-4 text-sm md:text-base">
                            Subscribe to our Email alerts to receive early discount offers,
                            and new products info.
                        </p>

                        <input
                            type="email"
                            placeholder="Email Address*"
                            className="w-full bg-neutral-800 text-white px-4 py-2 rounded outline-none"
                        />

                        <button className="bg-orange-600 w-full mt-4 py-2 rounded font-bold hover:bg-red-500 transition">
                            Subscribe
                        </button>
                    </div>

                    {/* COLUMN 2 */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold mb-4">Help</h1>
                        <ul className="space-y-2">
                            {["FAQs", "Track Order", "Cancel Order", "Return Order", "Warranty Info"].map((item) => (
                                <li key={item}>
                                    <p className="text-gray-300 hover:text-orange-500 cursor-pointer transition text-sm md:text-base">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3 */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold mb-4">Policies</h1>
                        <ul className="space-y-2">
                            {[
                                "Return Policy",
                                "Security",
                                "Sitemap",
                                "Privacy Policy",
                                "Terms & Conditions",
                            ].map((item) => (
                                <li key={item}>
                                    <p className="text-gray-300 hover:text-orange-500 cursor-pointer transition text-sm md:text-base">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4 */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold mb-4">Company</h1>
                        <ul className="space-y-2">
                            {[
                                "About Us",
                                "Contact Us",
                                "Service Center",
                                "Careers",
                                "Affiliates",
                            ].map((item) => (
                                <li key={item}>
                                    <p className="text-gray-300 hover:text-orange-500 cursor-pointer transition text-sm md:text-base">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-gray-700 my-10" />

                {/* BOTTOM SECTION */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm md:text-base">
                        2025 | All Right Reserved © Baba Otooru
                    </p>

                    <div className="flex gap-6 mt-4 sm:mt-0 text-xl">
                        <FaFacebookF className="cursor-pointer hover:text-blue-500 transition" />
                        <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
                        <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
                        <FaLinkedinIn className="cursor-pointer hover:text-blue-600 transition" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
