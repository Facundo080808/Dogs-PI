import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css"; // Importa el archivo CSS de módulos
import { Nav } from "../../components/nav/nav";

function Detail() {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const limpiarAños = (string)=>{
        const años = string.split("years")
        return años[0];
    }
    async function Fetch() {
        try {
            const cleanedId = id.replace(':', '');
            const response = await (await fetch(`http://localhost:4321/dogs/${cleanedId}`)).json();
            return setDog(response);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        Fetch();
    }, []);
    return (
        <header>
                <Nav></Nav>
            <section className={styles.section}>
                {dog && 
                    <figure className={styles.figure}>
                        <img className={styles.image} src={dog.image ? dog.image.url : dog.img} alt={dog.name} />
                        <figcaption className={styles.figcaption}>{dog.name}</figcaption>
                    </figure>
                }
                {dog &&
                    <article className={styles.article}>
                        <h1 className={styles.heading1}>Nombre : {dog.name}</h1>
                        <h2 className={styles.heading2}>Altura : {dog.height.metric || dog.height}</h2>
                        <h2 className={styles.heading2}>Peso en Libras : {dog.weight.metric || dog.weight}</h2>
                        <h2 className={styles.heading2}>Esperanza de vida : {dog.life_span  || dog.lifespan + " años"}</h2>
                        {dog.temperament ? 
                            
                            <p className={styles.paragraph}><h3>Temperaments: </h3>{dog.temperament}</p> : 
                            <ul className={styles.ul}><h3>Temperamentos: </h3> {dog.temperaments.map((element) => <li className={styles.li} key={element.name}>{element.name}</li>)}</ul>
                        }
                    </article>
                }
                {!dog && <h1 className={styles.loading}>loading...</h1>}
            </section>
        </header>
    );
}

export default Detail;
