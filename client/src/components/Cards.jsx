import styles from '../components/Cards.component.css';
function Cards(props) {

    return (
        <article>
            <figure className={styles.figure}><img className={styles.img} src={props.dog.image} alt={props.dog.name}/></figure>
            <h1>{props.dog.name}</h1>

        </article>
    )
}

export default Cards;