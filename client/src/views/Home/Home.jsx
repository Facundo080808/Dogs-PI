import {useDispatch,useSelector,useStore} from 'react-redux';
import {useState,useEffect} from 'react';
import { getDogsAction } from '../../redux/action';
import Cards from '../../components/Cards';

function Home() {
    const dispatch = useDispatch();
    const Dogs = useSelector(state=>state.dogs.apiDogs);
    console.log(Dogs);
    useEffect(()=>{
        dispatch(getDogsAction());
    },[dispatch])

    return(
        <main>
            <section>
            { Dogs ? Dogs.map((dog, index)=><Cards key={index} dog={dog}/>) : <h1>loading...</h1>}
            </section>
        </main>
    )
}

export default Home;