import {useDispatch,useSelector,useStore} from 'react-redux';
import {useState,useEffect} from 'react';
import { getDogsAction } from '../../redux/action';
import Cards from '../../components/Cards/Cards';
import styles from "./Home.module.css";
import { Filters } from '../../components/filters/filters';
import { Nav } from '../../components/nav/nav';

function Home() {
    const itemsPorPage = 8;
    const dispatch = useDispatch();
    const Dogs = useSelector(state=>state.dogs.apiDogs);
    const [dogs , setDogs] = useState(Dogs);
    const [currentPage , setCurrentPage] = useState(0);
    useEffect(()=>{
        dispatch(getDogsAction());
    },[dispatch])
    useEffect(() => {
        if (Dogs.length > 0) {
            setDogs([...Dogs].splice(0, itemsPorPage));
        }
    }, [Dogs]);
    
    

    const nextHandler = ()=>{
        const total = Dogs.length;
        const nextPage = currentPage + 1;
        const Index = nextPage * itemsPorPage;
        if (Index >= total) return;
        setDogs([...Dogs].splice(Index,itemsPorPage))
        setCurrentPage(nextPage);
    }
    const prevHandler = ()=>{
        const prevPage = currentPage - 1;
        if(prevPage < 0)return;
        const first = prevPage * itemsPorPage;
        setDogs([...Dogs].splice(first,itemsPorPage));
        setCurrentPage(prevPage);
    }
    
    return(
        <main className={styles.main}>
            <Nav Filters={Filters} dogs={dogs} setDogs={setDogs}></Nav>
            <section className={styles.section}>
            { dogs.length > 0 ? dogs.map((dog, index)=><Cards key={index} dog={dog}/>) : <h1>loading...</h1>}
            </section>
           {dogs.length > 0 &&<> <article className={styles.pagination}>
                <button onClick={prevHandler} className={styles.button}>⬅️ Previous</button>
                <button className={styles.refresh} onClick={()=>{setCurrentPage(0);setDogs([...Dogs].splice(0, itemsPorPage));}}>{currentPage + 1}</button>
                <button onClick={nextHandler} className={styles.button}>Next ➡️</button>
            </article>
            
            </>}
        </main>
    )
}

export default Home;