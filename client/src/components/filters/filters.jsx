import { useDispatch, useSelector } from "react-redux";
import { getDogsAction,ApiAction, DogsAZaction, DogsZAaction, createdAction, maxWeight, minWeight,getDogName, getTemperamentsAction, DogTemperamentAction } from "../../redux/action";
import styles from "./filters.module.css";
import { useState ,useEffect} from "react";

export function Filters({reestart}) {
    const [ selecTemp, setSelecTemp] = useState(false)
    const temps = useSelector(state=>state.dogs.temperaments);
    useEffect(()=>{
        dispatch(getTemperamentsAction());
    },[])
    const dispatch =useDispatch();
    const handleChangue = (e)=>{
        const {value}=e.target;
        switch (value) {
            case "a-z":
                setSelecTemp(false);
                dispatch(DogsAZaction())
                break;
            case "z-a":
                setSelecTemp(false);
                dispatch(DogsZAaction())
                break;
            case "db":
                setSelecTemp(false);
                dispatch(createdAction())
                break;
            case "api":
                setSelecTemp(false);
                dispatch(ApiAction())
                break;
            case "livianos":
                setSelecTemp(false);
                dispatch(minWeight())
                break;
            case "pesados":
                setSelecTemp(false);
                dispatch(maxWeight())
                break;
            case "temps":
                setSelecTemp(true);
            default:
                break;
        }
    }
    const Click = ()=>{
        setSelecTemp(false);
        reestart();
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
            <option value="temps">Temperamentos</option>
        </select>
        {selecTemp && <select name="" id="" className={styles.select}
        onChange={(e)=>{
          const {value} =  e.target;
          console.log(value);
          dispatch(DogTemperamentAction(value)); 
        }}
        >
                {temps && temps.map((element)=><option value={element.name} >{element.name}</option>)}
        </select>}
        </header>
    )
}