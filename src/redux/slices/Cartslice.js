import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: []
}

const Cartslice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        add: (state, action) => {
            state.items.push(action.payload)
        },
        remove: (state, action) => {
            state.items = state.items.filter((itemData) => action.payload.id !== itemData.id)
        },
        set: (state, action) => {
            state.items = action.payload
        },
        clear: (state, action) => {
            state.items = []
        }
    }
})

export const { add, remove, set, clear } = Cartslice.actions
export default Cartslice.reducer