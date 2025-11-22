import React, { createContext, useEffect, useState } from 'react'
import productsData from '../data/productsData';

export const globalContext = createContext();
const MyContext = ({ children }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(productsData);
    }, []);
    console.log(data);
    return (
        <div>
            <globalContext.Provider value={{ data }}>
                {children}
            </globalContext.Provider>
        </div>
    )

}
export default MyContext