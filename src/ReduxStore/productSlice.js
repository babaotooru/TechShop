import { createSlice } from "@reduxjs/toolkit";
const loadCart=()=>{
    try{
        return JSON.parse(localStorage.getItem("cartItems")) || []
    }catch{
        return []
    }
};
//create a slice
const productSlice=createSlice({
    name:"cartItems",
    initialState:{cart:loadCart()},
    reducers:{
        addToCart:(state,{payload})=>{
            const item=state.cart.find((i)=>i.id===payload.id);
            const qty=payload.quantity||1;
            item?(item.quantity+=qty):state.cart.push({...payload,quantity:qty});
        },
        removeFromCart:(state,{payload})=>{
            state.cart=state.cart.filter((i)=>i.id!==payload.id);
        },
        increaseQty:(state,{payload})=>{
            const item=state.cart.find((i)=>i.id===payload.id);
            item&&item.quantity++;
        },
        decreaseQty:(state,{payload})=>{
            const item=state.cart.find((i)=>i.id===payload.id);
            item?.quantity>1
            ?item.quantity--
            :(state.cart=state.cart.filter((i)=>i.id!==payload.id))
        },
    },

});
//Middleware to save cart to localStorage
const cartMiddleware=(store)=>(next)=>(action)=>{
    const result=next(action);
    try{
        localStorage.setItem("cartItems",JSON.stringify(store.getState().cartItems.cart));
    }catch {}
    return result;
};
// export actions and reducer
export const {addToCart,removeFromCart,increaseQty,decreaseQty}=productSlice.actions;
export const cartReducer=productSlice.reducer;
export const cartMiddlewareFn=cartMiddleware;
