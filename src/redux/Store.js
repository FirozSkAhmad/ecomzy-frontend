import {configureStore} from "@reduxjs/toolkit"
import Cartslice from "./slices/Cartslice"

export const Store=configureStore({
    reducer:{
        cart:Cartslice
    }
})

