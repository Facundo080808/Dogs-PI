import {Link} from "react-router-dom"
import styles from "./nav.module.css"
import { getDogsAction } from "../../redux/action";
import { useDispatch } from "react-redux";
import { useState } from "react";
export function Nav({Filters}) {
    const dispatch = useDispatch();
    
    return(
        <header className={styles.header}>

            <nav className={styles.nav}>
                <Link to="/home">
                <button className={styles.buttons} onClick={()=>dispatch(getDogsAction())}>Home</button>
                </Link>
                <Link to="/create">
                <button className={styles.buttons}>Crear tu raza</button>
                </Link>
            </nav>
           {Filters && <Filters></Filters>}
        </header>
    )
}