import { createSlice } from "@reduxjs/toolkit"

const init = {
    currentUser: null,
    userForEditing: null
}
const userSlice = createSlice({
    initialState: init,
    name: "user",
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser",JSON.stringify(action.payload));
        },
        userOut: (state, action) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser")
        },
        sendUserToEdit: (state, action) => {
            state.userForEditing = action.payload;
        },
        outFromEditUser: (state, action) => {
            state.userForEditing = null;
        }
    }
})

export default userSlice.reducer;
export const { userIn, userOut, sendUserToEdit, outFromEditUser } = userSlice.actions;