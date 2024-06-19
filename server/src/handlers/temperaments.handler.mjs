import db from "../db.mjs";
const {dogs,temperaments}= db;

export async function temperamentsToDB() {
    const Api = await (await fetch("https://api.thedogapi.com/v1/breeds")).json();
    for (const element of Api) {
        temperaments.create({
            id:element.id,
            name : element.temperament ?? "name no defindo"
        })
    }
    
    
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