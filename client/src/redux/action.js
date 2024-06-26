import { getDogs , getTemperament } from "./reducer";

export function getDogsAction() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
            return dispatch(getDogs(dogsInfo))
        } catch (error) {
            console.log(error.message);
        }
    }
}
export function getDogName(name) {
    return async (dispatch)=>{
        try {
            const response = await (await fetch(`http://localhost:4321/dogs/dog/${name}`)).json();
            return dispatch(getDogs(response))
        } catch (error) {
            console.log(error.message);
        }
}}
export function getTemperamentsAction() {
    return async(dispatch)=>{
        try {
            const temps = await(await fetch("http://localhost:4321/temperaments")).json();
            return dispatch(getTemperament(temps))
        } catch (error) {
            console.error(error.message);
        }
    }
}

export function postDogAction(objeto) {return async(dispatch)=>{
    try {
        const response = {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(objeto)    
        }
        const post = await(await fetch("http://localhost:4321/dogs" , response)).json();
        return dispatch(getDogs(post))
    } catch (error) {
        console.error(error.message);
    }
}}

export function DogsAZaction() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
            const sorted = dogsInfo.sort((a,b)=>a.name.localeCompare(b.name));
            return dispatch(getDogs(sorted));
        } catch (error) {
            console.error(error.message);
        }
    }
}
export function DogsZAaction() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
            const sorted = dogsInfo.sort((a,b)=>b.name.localeCompare(a.name));
            return dispatch(getDogs(sorted));
        } catch (error) {
            console.error(error.message);
        }
    }
}
export function createdAction() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
            const filtred = dogsInfo.filter((element)=>element.created === true);
            return dispatch(getDogs(filtred));
        } catch (error) {
            console.error(error.message);
        }
}}
export function ApiAction() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
            const filtred = dogsInfo.filter((element)=>element.created === false);
            return dispatch(getDogs(filtred));
        } catch (error) {
            console.error(error.message);
        }
}}
export function minWeight() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
            const filtred = dogsInfo.sort((a,b)=>a.midweight - b.midweight);
            return dispatch(getDogs(filtred));
        } catch (error) {
            console.error(error.message);
        }
}}
export function maxWeight() {
    return async (dispatch)=>{
        try {
            const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
            const filtred = dogsInfo.sort((a,b)=>b.midweight - a.midweight);
            return dispatch(getDogs(filtred));
        } catch (error) {
            console.error(error.message);
        }
}}
export function DogTemperamentAction(string) {
        return async(dispatch)=>{
            try {
                const dogsInfo = await (await fetch("http://localhost:4321/dogs")).json();
                const filteredDogs = dogsInfo.filter((element) => {
                    if (element.temperament) {
                        return element.temperament.includes(string);
                    } else if (element.temperaments) {
                        return element.temperaments.some(temp => temp.name.includes(string));
                    }
                    return false;
                });
                
                console.log(filteredDogs);
                dispatch(getDogs(filteredDogs));
            } catch (error) {
                console.error(error.message);
            }
        }
}





