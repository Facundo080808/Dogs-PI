import {configureStore} from "@reduxjs/toolkit"
import DogsReducer from "../redux/reducer"

export const store = configureStore({reducer:{
    dogs : DogsReducer
}})
