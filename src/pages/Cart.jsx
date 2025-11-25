import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsCartX } from "react-icons/bs";
import { decreaseQty, increaseQty, removeFromCart } from "../ReduxStore/productSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cartItems);

    // ✅ ALWAYS OPEN CART FROM TOP
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const originalPrice = cart.reduce(
        (acc, item) => acc + item.originalPrice * item.quantity,
        0
    );
    const finalPrice = cart.reduce(
        (acc, item) => acc + item.finalPrice * item.quantity,
        0
    );
    const discount = originalPrice - finalPrice;

    return (
        <div className="w-full min-h-screen bg-black text-white px-4 py-6 pt-14">

            {cart.length === 0 ? (
                /* EMPTY CART */
                <div className="flex flex-col items-center justify-center mt-10">
                    <BsCartX className="text-red-600 text-[150px] mb-6" />
                    <h1 className="text-4xl font-bold text-center">
                        Your cart is empty
                    </h1>

                    <Link to="/Allproducts" className="mt-8">
                        <button className="bg-red-600 text-white flex items-center gap-4 px-8 py-4 rounded-xl text-2xl font-bold">
                            <FaArrowLeftLong />
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-6 justify-center mt-4">

                    {/* CART ITEMS - LEFT */}
                    <div className="md:w-2/3 max-h-[75vh] overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.id} className="w-full pb-6">
                                <div className="flex flex-col sm:flex-row items-center gap-6">

                                    {/* Image */}
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="w-[110px] h-[110px] object-contain"
                                    />

                                    {/* Product Info */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <h5 className="text-2xl font-bold">{item.title}</h5>

                                        <p className="text-xl font-bold mt-1">
                                            ₹{item.finalPrice}
                                            <span className="text-gray-400 ml-3">
                                                <s>₹{item.originalPrice}</s>
                                            </span>
                                        </p>

                                        {/* Qty Buttons */}
                                        <div className="flex items-center justify-center sm:justify-start mt-3 bg-black border border-gray-500 rounded-md w-[200px]">
                                            <button
                                                className="w-[50px] py-1 border-r border-gray-600"
                                                onClick={() => dispatch(decreaseQty(item))}
                                            >
                                                -
                                            </button>

                                            <input
                                                type="number"
                                                value={item.quantity}
                                                readOnly
                                                className="w-full bg-black text-center outline-none"
                                            />

                                            <button
                                                className="w-[50px] py-1 border-l border-gray-600"
                                                onClick={() => dispatch(increaseQty(item))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove button */}
                                    <button
                                        className="text-red-500 text-2xl cursor-pointer"
                                        onClick={() => dispatch(removeFromCart(item))}
                                    >
                                        🗑️
                                    </button>
                                </div>

                                <hr className="border-gray-700 mt-6 w-[95%] mx-auto" />
                            </div>
                        ))}
                    </div>

                    {/* ORDER SUMMARY - RIGHT */}
                    <div className="md:w-1/3 bg-neutral-800 rounded-lg p-5 h-fit sticky top-28">
                        <h4 className="text-xl font-bold">
                            Order Summary ({cart.length} items)
                        </h4>

                        <div className="mt-6 space-y-3 text-lg">
                            <div className="flex justify-between">
                                <p>Original Price</p>
                                <p>₹{originalPrice.toLocaleString()}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Discount</p>
                                <p className="text-green-400">
                                    - ₹{discount.toLocaleString()}
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <p>Delivery</p>
                                <p className="text-green-400">Free</p>
                            </div>

                            <hr className="border-gray-500 my-3" />

                            <div className="flex justify-between font-bold text-xl">
                                <h4>Total Price</h4>
                                <h4>₹{finalPrice.toLocaleString()}</h4>
                            </div>
                        </div>

                        <button className="w-full bg-orange-600 py-3 rounded text-lg font-bold mt-6 hover:bg-orange-700 transition">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
