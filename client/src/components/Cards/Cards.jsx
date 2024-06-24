import styles from './Cards.module.css';
import {Link} from "react-router-dom";
function Cards(props) {
    const background = {
        backgroundImage: `url(${props.dog.image || props.dog.img})`,
        backgroundSize: 'cover',
        backgroundRepeat:"no-repeat",
        backgroundPosition: 'center',
    }
    const getTemperament = () => {
        if (props.dog.temperament) {
            return props.dog.temperament;
        } else if (props.dog.temperaments && props.dog.temperaments.length > 0) {
            return props.dog.temperaments[0].name + '...';
        } else {
            return 'Loading...';
        }
    };
    return (
        <article className={styles.card}>
            <article className={styles.front} style={background} >
                <h1 className={styles.name}>{props.dog.name}</h1>
            </article>
            <article className={styles.back}>
                <h2>{props.dog.weight.imperial || props.dog.weight}</h2>
                <p>{getTemperament()}</p>
                <Link to={`/home/:${props.dog.id}`}>
                <h2 className={styles.detail}>Detalle</h2>
                </Link>
            </article>
        </article>
    )
}

export default Cards;