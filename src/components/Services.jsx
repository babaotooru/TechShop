import React from "react";
import servicesData from "../data/servicesData.jsx";

const Services = () => {
    return (
        <div className="bg-neutral-900 py-10">
            <h3 className="text-center text-white text-2xl font-semibold mb-10">
                Our Advantages
            </h3>

            {/* Responsive Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">

                {servicesData.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start gap-4 p-2"
                    >
                        {/* Icon */}
                        <div className="text-red-500 text-4xl flex-shrink-0">
                            {item.icon}
                        </div>

                        {/* Text */}
                        <div>
                            <h4 className="text-white font-semibold text-lg">
                                {item.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                                {item.info}
                            </p>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default Services;
