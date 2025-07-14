import { createSlice } from "@reduxjs/toolkit"

const init = {
    arr: [],
    sum: 0,
    count: 0,
    addedNow: false,
    successOrder: false,
}
const cartSlice = createSlice({
    initialState: init,
    name: "cart",
    reducers: {
        addItem: (state, action) => {
            let toys = state.arr.find(item => item.toyId == action.payload.toyId)
            if (!toys) {
                let i = { ...action.payload, quantity: 1 };
                state.arr.push(i);
            }
            else
                toys.quantity++;
            state.sum += action.payload.price;
            state.count++;
            localStorage.setItem("cart", JSON.stringify(state.arr));
            localStorage.setItem("sum", JSON.stringify(state.sum));
            localStorage.setItem("count", JSON.stringify(state.count));
        },
        removeItem: (state, action) => {
            let index = state.arr.findIndex(item => item.toyId == action.payload.toyId);
            console.log(index + " index");
            state.count -= action.payload.quantity;
            state.sum -= action.payload.quantity * action.payload.price;
            state.arr.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(state.arr))
            localStorage.setItem("sum", JSON.stringify(state.sum));
            localStorage.setItem("count", JSON.stringify(state.count));
        },
        reduceItem: (state, action) => {
            let index = state.arr.findIndex(item => item.toyId == action.payload.toyId)
            if (state.arr[index].quantity == 1) {
                state.arr.splice(index, 1);
            }
            else
                state.arr[index].quantity--;
            state.count--;
            state.sum -= action.payload.price;
            localStorage.setItem("cart", JSON.stringify(state.arr))
            localStorage.setItem("sum", JSON.stringify(state.sum));
            localStorage.setItem("count", JSON.stringify(state.count));
        },
        CartInitialization: (state, action) => {
            state.arr = action.payload;
            state.sum = JSON.parse(localStorage.getItem("sum", JSON.stringify(state.sum)));
            state.count = JSON.parse(localStorage.getItem("count", JSON.stringify(state.count)));
        },
        EmptyingCart: (state, action) => {
            localStorage.removeItem("cart")
            localStorage.removeItem("sum")
            localStorage.removeItem("count")
            state.arr = [];
            state.sum = 0;
            state.count = 0;
        },
        onAdded: (state, action) => {
            state.addedNow = true;
        },
        offAdded: (state, action) => {
            state.addedNow = false;
        },
        setSuccessOrder: (state, action) => {
            state.successOrder = action.payload;
        }
    }
})

export default cartSlice.reducer;
export const { addItem, removeItem, reduceItem, CartInitialization, EmptyingCart, onAdded, offAdded, setSuccessOrder } = cartSlice.actions;