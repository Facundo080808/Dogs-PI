import { useDispatch } from "react-redux";
import { getDogsAction,ApiAction, DogsAZaction, DogsZAaction, createdAction, maxWeight, minWeight,getDogName } from "../../redux/action";
import styles from "./filters.module.css";
import { useState } from "react";

export function Filters() {
    const dispatch =useDispatch();
    const handleChangue = (e)=>{
        const {value}=e.target;
        switch (value) {
            case "a-z":
                dispatch(DogsAZaction())
                break;
            case "z-a":
                dispatch(DogsZAaction())
                break;
            case "db":
                dispatch(createdAction())
                break;
            case "api":
                dispatch(ApiAction())
                break;
            case "livianos":
                dispatch(minWeight())
                break;
            case "pesados":
                dispatch(maxWeight())
                break;
            default:
                break;
        }
    }
    const Click = ()=>{
        return dispatch(getDogsAction())
    }
    const [Input , setInput] = useState(null);
    const InputHandler = (name)=>{
      return dispatch(getDogName(name));
    }
    const handleSearch = () => {
        InputHandler(Input); 
    };
    return(
        <header className={styles.section}>
        <label htmlFor="" className={styles.searchContainer}>
                <input type="text" name="buscar" className={styles.searchInput} onChange={(e) => setInput(e.target.value)}/>
                <button className={styles.searchButton} onClick={handleSearch}>🔍</button>
        </label>
        <button onClick={Click} className={styles.buttons}>
            Limpiar Filtros
        </button>
        <select name="" id="" onChange={handleChangue} className={styles.select}>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="db">Creados</option>
            <option value="api">Api</option>
            <option value="livianos">Menor peso</option>
            <option value="pesados">Mayor peso</option>
        </select>
        </header>
    )
}