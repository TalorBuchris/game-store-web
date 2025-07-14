import { createSlice } from "@reduxjs/toolkit"

const init = {
    arrToys: [],
    toyForEditing: null
}
const toysSlice = createSlice({
    initialState: init,
    name: "toys",
    reducers: {
        sendToyToEdit: (state, action) => {
            state.toyForEditing = action.payload;
        },
        outFromEdit: (state, action) => {
            state.toyForEditing = null;
        }
    }
})

export default toysSlice.reducer;
export const { sendToyToEdit, outFromEdit } = toysSlice.actions;