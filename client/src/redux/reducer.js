import { createSlice } from "@reduxjs/toolkit";

const Dogs = createSlice({
    name:"dogs",
    initialState:{apiDogs:[], temperaments:[], loading: false,
        error:null},
        reducers:{
            getDogs:(state,action)=>{
                state.apiDogs = action.payload;
            }
        }
})

export default Dogs.reducer;
export const{getDogs} =Dogs.actions;