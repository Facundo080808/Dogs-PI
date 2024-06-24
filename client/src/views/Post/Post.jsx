import { useEffect, useState } from "react";
import styles from "./Post.module.css"
import { getTemperamentsAction, postDogAction } from "../../redux/action";
import {useDispatch,useSelector,useStore} from 'react-redux';
import { Nav } from "../../components/nav/nav";


function Post() {
    const imagenporlasdu="https://imgv3.fotor.com/images/share/fotor-ai-generate-a-lifelike-dragon.jpg"
    const dispatch = useDispatch();
    const temps = useSelector(state=>state.dogs.temperaments);
function validateHW(string) {
    const separados = string.split("-")
    if (parseInt(separados[0],10)< parseInt(separados[1],10)) {
        return true;
    }else{return false}
}

useEffect(()=>{
    dispatch(getTemperamentsAction());
},[])
const [good, setGood] = useState("");
const [inputs , setInputs] = useState({
    name:"",
    img:"https://imgv3.fotor.com/images/share/fotor-ai-generate-a-lifelike-dragon.jpg",
    height:"",
    weight:"",
    lifespan:"",
    temp:[]
})
console.log(inputs);
const [errors , setErrors] = useState({
    name:"Campo obligatorio",
    img:"Si no añades una imagen, se añadira una por defecto",
    height:"Campo obligatorio",
    weight:"campo obligatorio",
    lifespan:"Campo obligatorio",
    temp:"Elegir almenos uno"
})
const handleChangueInput = (event)=>{
    const {name, value} = event.target
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    if (name === "nombre") {
        if (regex.test(value)) {
            setInputs((prevState)=>({
                ...prevState,
                name:value
            }))   
            setErrors((prevState)=>({
                ...prevState,
                name:""
            }))    
        }else{
            setErrors((prevState)=>({
                ...prevState,
                name:"Solo puedes escribir letras en este campo"
            }))
        }
    }
    else if (name ==="imagen") {
        const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?$/;
       if (regex.test(value)) {
        setInputs((prevState)=>({
            ...prevState,
            img:value
        }))   
        setErrors((prevState)=>({
            ...prevState,
            img:""
        }))
       }else{setErrors((prevState)=>({
        ...prevState,
        img:"Formato de imagen url invalido"
         }))
         setInputs((prevState)=>({...prevState,temp:imagenporlasdu}))
}

    }
    else if (name ==="peso"){
        const regex=/^\d+-\d+$/;
        if (regex.test(value)) {
            if(validateHW(value)){
                setInputs((prevState)=>({
                    ...prevState,
                    weight:value
                }))  
                setErrors((prevState)=>({
                    ...prevState,
                    weight:""
                }))    
            }else{setErrors((prevState)=>({
                ...prevState,
                weight:"El primer numero debe ser menor al segundo"
            }))}
           }else{setErrors((prevState)=>({
            ...prevState,
            weight:"Solo debe contener 2 numeros separados de un guion"
        }))}

    }
    else if (name ==="altura"){
        const regex=/^\d+-\d+$/;
        if (regex.test(value)) { 
            if(validateHW(value)){
                setInputs((prevState)=>({
                    ...prevState,
                    height:value
                }))  
                setErrors((prevState)=>({
                    ...prevState,
                    height:""
                }))    
            }else{setErrors((prevState)=>({
                ...prevState,
                height:"El primer numero debe ser menor al segundo"
            }))}
           }else{setErrors((prevState)=>({
            ...prevState,
            height:"Solo debe contener 2 numeros separados de un guion"
        }))}

    }
    else if (name ==="años de vida"){
        const regex = /^\d+$/;
        if (regex.test(value)) {
            setInputs((prevState)=>({
                ...prevState,
                lifespan:value
            }))
            setErrors((prevState)=>({
                ...prevState,
                lifespan:""
            }))
           }else{setErrors((prevState)=>({
            ...prevState,
            lifespan:"Solo debe contener numeros"
        }))}
        
    }else if (name ==="temps") {
        if (inputs.temp.length === 0) {
            setErrors((prevState)=>({...prevState,temp:"Debes elegir almenos un temperamento"}))
        }
        setErrors((prevState)=>({...prevState,temp:""}))
        let array = [];
        array.push(value);
        setInputs((prevState)=>{
            array.push(...prevState.temp)
            const seted = new Set([...array])
            return{
                ...prevState,
                temp:[...seted]
            }
        }) 
    }
}

const handleSubmit = (e)=>{
    e.preventDefault();
    function pesomedio(string) {
        const splited = string.split("-")
        const numbers = splited.map((element)=>parseInt(element,10))
        return numbers[1] + numbers[0]
    }
    const data ={
        name : inputs.name,
        img : inputs.img ?? imagenporlasdu,
        height: inputs.height,
        weight:inputs.weight,
        midweight:pesomedio(inputs.weight),
        lifespan:inputs.lifespan,
        temp:inputs.temp
    }
    setGood("Raza creada con exito")
    setErrors({name:"",
        img:"",
        height:"",
        weight:"",
        lifespan:"",
        temp:""});
   return dispatch(postDogAction(data));
}
    return(
        <>
        <Nav></Nav>
        <section className={styles.postsection}>
            {!good && <h1>Aqui crearas a tu perro</h1>}
            <form className={styles.postform} >
                {!good && <><label className={styles.formlabel} htmlFor="">
                    <h2>Nombre :</h2>
                    <input type="text" className={styles.forminput} name="nombre" onChange={handleChangueInput}/>
                    {errors.name &&<span className={styles.errorMessage}>{errors.name}</span>}
                </label>
                <label className={styles.formlabel} htmlFor="">
                    <h2>Imagen :</h2>
                    <input type="text" className={styles.forminput} name="imagen" onChange={handleChangueInput} />
                    {errors.img&&<span className={styles.errorMessage}>{errors.img}</span>}
                </label>
                <label className={styles.formlabel} htmlFor="">
                    <h2>Peso en kilos :</h2>
                    <input type="text" className={styles.forminput} name="peso" onChange={handleChangueInput}/>
                    {errors.weight&&<span className={styles.errorMessage}>{errors.weight}</span>}
                </label>
                <label className={styles.formlabel} htmlFor="">
                    <h2>Altura :</h2>
                    <input type="text" className={styles.forminput} name="altura" onChange={handleChangueInput}/>
                    {errors.height&&<span className={styles.errorMessage}>{errors.height}</span>}
                </label>
                <label  className={styles.formlabel}>
                    <h2>Años de vida :</h2>
                    <input type="text" className={styles.forminput} name="años de vida" onChange={handleChangueInput}/>
                    {errors.lifespan &&<span className={styles.errorMessage}>{errors.lifespan}</span>}
                </label>
                <label htmlFor="" className={styles.formlabel}>
                    <select name="temps" id="" className={styles.formselect} onChange={handleChangueInput}>
                {temps && temps.map((elemet)=><option key={elemet.id}>{elemet.name}</option>)}
                    </select>
                    {errors.temp&&<span className={styles.errorMessage}>{errors.temp}</span>}
                </label>
                {!errors.name && !errors.height && !errors.lifespan && !errors.weight&& !errors.temp&&<button className={styles.button} onClick={handleSubmit}>
                    <h2>Crear</h2>
                </button>}</>}
                {good &&<span className={styles.goodMessage}>{good}</span>}
            </form>
        </section>
        </>
    )
}

export default Post;
