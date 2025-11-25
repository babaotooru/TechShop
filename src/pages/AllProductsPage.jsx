import React, { useContext, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { toast } from "react-toastify";
import { addToCart } from "../ReduxStore/productSlice";
import { globalContext } from "../mycontext/MyContext";

const ProductCard = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartItems.cart);
    const isAdded = cart.some(cartItem => cartItem.id === item.id);
    const [addedTemp, setAddedTemp] = useState(false);



    return (
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 transition hover:border-red-600 hover:scale-[1.02] duration-300 ">

            <Link to={`/product/${item.id}`}>
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-contain bg-black rounded-lg mb-3 hover:scale-105 duration-300"
                />
            </Link>

            <div>
                <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-red-500 text-xs"></i>
                    ))}
                </div>

                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.info}</p>

                <div className="flex items-center gap-2 mt-2 mb-3">
                    <span className="text-white font-bold text-lg">₹{item.finalPrice}</span>
                    <span className="line-through text-gray-500 text-sm">₹{item.originalPrice}</span>
                </div>

                <button
                    className={`w-full py-2 rounded-lg font-semibold transition
        ${addedTemp
                            ? "bg-green-600 text-white"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                    onClick={() => {
                        dispatch(addToCart(item));

                        setAddedTemp(true); // turn green
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

                        // After 2 seconds revert button
                        setTimeout(() => {
                            setAddedTemp(false);
                        }, 500);
                    }}
                >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    {addedTemp ? "Added ✅" : "Add to Cart"}
                </button>


            </div>
        </div>
    );
};

const Sidebar = ({ setSort, filters, setFilters, priceRange, setPriceRange }) => {
    const handleCheck = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter(v => v !== value)
                : [...prev[type], value],
        }));
    };

    return (
        <div className="w-full lg:w-64 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-neutral-700 p-5 space-y-6">

            {/* SORT */}
            <div>
                <h3 className="text-white font-bold mb-2">Sort By</h3>
                <ul className="space-y-2 text-gray-300">
                    <li className="cursor-pointer hover:text-red-500" onClick={() => setSort("latest")}>Latest</li>
                    <li className="cursor-pointer hover:text-red-500" onClick={() => setSort("featured")}>Featured</li>
                    <li className="cursor-pointer hover:text-red-500" onClick={() => setSort("topRated")}>Top Rated</li>
                    <li className="cursor-pointer hover:text-red-500" onClick={() => setSort("lowToHigh")}>Price (Low → High)</li>
                    <li className="cursor-pointer hover:text-red-500" onClick={() => setSort("highToLow")}>Price (High → Low)</li>
                </ul>
            </div>

            {/* BRANDS */}
            <div>
                <h3 className="text-white font-bold mb-2">Brands</h3>
                {["JBL", "boAt", "Sony"].map(b => (
                    <label key={b} className="flex items-center gap-2 text-gray-300">
                        <input
                            type="checkbox"
                            checked={filters.brand.includes(b)}
                            onChange={() => handleCheck("brand", b)}
                        />
                        {b}
                    </label>
                ))}
            </div>

            {/* CATEGORY */}
            <div>
                <h3 className="text-white font-bold mb-2">Category</h3>
                {["Headphones", "Earbuds", "Earphones", "Neckbands"].map(c => (
                    <label key={c} className="flex items-center gap-2 text-gray-300">
                        <input
                            type="checkbox"
                            checked={filters.category.includes(c)}
                            onChange={() => handleCheck("category", c)}
                        />
                        {c}
                    </label>
                ))}
            </div>

            {/* PRICE RANGE */}
            <div>
                <h3 className="text-white font-bold mb-2">Price Range</h3>
                <p className="text-gray-300 text-sm mb-1">Up to ₹{priceRange}</p>
                <input
                    type="range"
                    min="0"
                    max="20000"
                    value={priceRange}
                    step="500"
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-red-600"
                />
            </div>
        </div>
    );
};

const AllProductsPage = () => {
    const { data } = useContext(globalContext);

    const [sort, setSort] = useState(null);
    const [filters, setFilters] = useState({ brand: [], category: [] });
    const [priceRange, setPriceRange] = useState(20000);

    const products = useMemo(() => {
        let result = [...data];

        if (filters.brand.length)
            result = result.filter(p => filters.brand.includes(p.brand));

        if (filters.category.length)
            result = result.filter(p => filters.category.includes(p.category));

        result = result.filter(p => p.finalPrice <= priceRange);

        if (sort === "lowToHigh") result.sort((a, b) => a.finalPrice - b.finalPrice);
        if (sort === "highToLow") result.sort((a, b) => b.finalPrice - a.finalPrice);
        if (sort === "latest") result.sort((a, b) => b.id - a.id);

        return result;
    }, [data, sort, filters, priceRange]);

    return (
        <div className="bg-black min-h-screen text-white flex flex-col lg:flex-row ">

            {/* LEFT SIDEBAR */}
            <Sidebar
                setSort={setSort}
                filters={filters}
                setFilters={setFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />

            {/* MAIN CONTENT */}
            <div className="flex-1 p-6">

                <h2 className="text-3xl font-bold mb-6">All Products</h2>

                {products.length === 0 ? (
                    <p className="text-gray-400 text-lg">No products found</p>
                ) : (
                    <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6
          ">
                        {products.map(p => (
                            <ProductCard key={p.id} item={p} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AllProductsPage;
