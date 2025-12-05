import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
    try {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
        return [];
    }
};

const productSlice = createSlice({
    name: "cartItems",
    initialState: { cart: loadCart() },
    reducers: {
        addToCart: (state, { payload }) => {
        const item = state.cart.find(i => i.id === payload.id);

        if (item) {
            item.quantity += 1;  
        } else {
            state.cart.push({ ...payload, quantity: 1 }); 
        }
    },
        removeFromCart: (state, action) => {
    const item = state.cart.find(p => p.id === action.payload.id);

    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;   
        } else {
            state.cart = state.cart.filter(p => p.id !== action.payload.id);  
           
        }
    }
},
        increaseQty: (state, { payload }) => {
            const item = state.cart.find(i => i.id === payload.id);
            if (item) item.quantity++;
        },
        decreaseQty: (state, { payload }) => {
            const item = state.cart.find(i => i.id === payload.id);
            if (item?.quantity > 1) {
                item.quantity--;
            } else {
                state.cart = state.cart.filter(i => i.id !== payload.id);
            }
        },
    },
});

const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    try {
        localStorage.setItem("cartItems", JSON.stringify(store.getState().cartItems.cart));
    } catch {}
    return result;
};

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = productSlice.actions;
export const cartReducer = productSlice.reducer;
export const cartMiddlewareFn = cartMiddleware;
