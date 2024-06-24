const url = "https://api.thedogapi.com/v1/breeds?api_key=live_yIEqviNQl6yBr0ZvPuuQqun1EwNwJ1pBSJZG0xsLWY93o47nsKnR9gj8XHapifu9";
import axios from "axios";
import db from "../db.mjs";
const {dogs,temperaments}= db;

function pesomedio(string) {
    if (!string.includes("-")) {
        return parseInt(string,10) * 1.5;
    }
    else if (string.includes("up")) {
        const splited = string.split("up - ")    
        const response =parseInt(splited[1],10) ;
        console.log(response);
        return response *1.5 ;
    }
    else{
    const splited = string.split(" - ")
    const numbers = splited.map((element)=>parseInt(element,10))
    return numbers[1] + numbers[0]}
}

export async function getDogsHandler(req , res) {
    const dogsApi = (await axios.get(url)).data;
    let dogies = dogsApi.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            lifespan: dog.life_span,
            temperament:dog.temperament,
            height: dog.height,
            weight: dog.weight,
            midweight:pesomedio(dog.weight.imperial),
            image:dog.image.url,
            created:false
        };
    });
    let dogsDb = await dogs.findAll({include:{model : temperaments}});
    try {if (dogs) {
        res.status(200).json(dogsDb.concat(dogies))
    }
    else{res.status(404)}
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getIdDogHandler(req , res) {
    let id = req.params.id
    const dogsApi = (await axios.get(url)).data;
    let dogsDb = await dogs.findAll();
    
    try {
        if (isNaN(id)) {
            const response =await dogs.findOne({ where : {id},include: {model : temperaments}})
            console.log(response);
            res.status(200).json(response) 
            
        }
        else if (!isNaN(id)) {
            
            id = parseInt(id, 10);
           const response = dogsApi.find((d)=> d.id === id)
           console.log(response);
           res.status(200).json(response) 
            
        }  
        else{
            res.status(400).send("ID no encontradp")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function getNameDogHandelr(req , res) {
    
    const name = req.params.name;
    try {
        if (isNaN(name)) { 
            const response = await dogs.findOne({ where : {name}})
            if(response){
                    let array = [];
                    array.push(response)
                  res.status(200).json(array)
                }else{
                const dogFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
                    if (dogFromApi.data.length > 0) {
                        res.status(200).json(dogFromApi.data)  
    
            }   else{
                 res.status(404).send("No se encontró el perro con el nombre proporcionado");
            }
            }
        }else{
            res.status(400).send("no se recibio un string por name")
        }

        
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export async function postDog(req , res) {
    function pesoMedio(string) {
        const splited = string.split("-")
        const numbers = splited.map((element)=>parseInt(element,10))
        return numbers[1] + numbers[0]
    }
    const {name ,img , height , weight ,lifespan,temp } = req.body;
    try {
        const midweight = pesoMedio(weight);
        const newDog = await dogs.create({name,img,height,weight,midweight,lifespan})

        if(temp && temp.length > 0){
            const temperament = await temperaments.findAll({
                where:{name:temp},
                include:dogs
            })
            await newDog.addTemperaments(temperament)
        }

        res.status(200).json(newDog)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export default{getDogsHandler,getIdDogHandler,getNameDogHandelr,postDog}