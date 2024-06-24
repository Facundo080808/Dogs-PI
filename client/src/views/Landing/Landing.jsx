import styles from "./Landing.module.css"
import {Link} from "react-router-dom" 
function Landing() {
    return(
        <main className={styles.main}>
            <article className={styles.article}>
            <h1 className={styles.h1}>Bienvenidos a Creación de Razas Caninas</h1>
            <h2 className={styles.h2}>¿Qué encontrarás aquí?
            </h2>
            <ul className={styles.ul}>
                <li className={styles.li}>Galería de Razas: Una extensa colección de razas de perros con descripciones detalladas, historia, características y curiosidades.</li>
                <li className={styles.li}>Creador de Razas: Una herramienta innovadora que te permitirá combinar características de diferentes razas para crear tu propio perro único.</li>
            </ul>
            <Link to="/home">
            <button className={styles.button}>
                Home
            </button>
            </Link>
            </article>
        </main>
    )
}

export default Landing;