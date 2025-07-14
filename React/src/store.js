import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import toysSlice from "./features/toys/toysSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
    reducer: {
        cartToys: cartSlice,
        u: userSlice,
        t: toysSlice
    },
})

export default store;