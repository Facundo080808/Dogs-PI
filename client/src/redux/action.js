import { getDogs } from "./reducer";

export function getDogsAction() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:3123/dogs")).json();
            return dispatch(getDogs(dogsInfo))
        } catch (error) {
            
        }
    }
    

}
