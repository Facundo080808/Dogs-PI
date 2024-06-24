import { createSlice } from "@reduxjs/toolkit";

const Dogs = createSlice({
    name:"dogs",
    initialState:{apiDogs:[], temperaments:[]},
        reducers:{
            getDogs:(state,action)=>{
                state.apiDogs = action.payload;
            },
            getTemperament:(state,action)=>{
                state.temperaments = action.payload;
            }
        }
})

export default Dogs.reducer;
export const{getDogs ,getTemperament} =Dogs.actions;