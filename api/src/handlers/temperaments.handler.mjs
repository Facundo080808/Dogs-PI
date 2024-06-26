import db from "../db.mjs";
const {dogs,temperaments}= db;
let AllTemps = new Set([]);
async function Temperaments(string) {
    if (string) {
        const unTemp = string.split(",")
        
        return await unTemp.map((element)=>( AllTemps.add(element)))
    }
}

export async function temperamentsToDB() {
    const Api = await (await fetch("https://api.thedogapi.com/v1/breeds")).json();
    for (const element of Api) {
        Temperaments(element.temperament)
    }
    
    return[...AllTemps].map((element)=>{temperaments.create({
        name:element
    })})
}

export async function getTemperamentsHandler(req , res) {
    try {
        const showDB=await temperaments.findAll({include:{
            model:dogs
        }})
        res.status(200).json(showDB)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export default {getTemperamentsHandler, temperamentsToDB};