import { getDogsHandler, getIdDogHandler, getNameDogHandelr, postDog } from "../handlers/dogs.handler.mjs";
import express from "express";
const dogsRoutes = express.Router();   

dogsRoutes.get("/dog/:name",getNameDogHandelr);
dogsRoutes.get("/:id", getIdDogHandler);
dogsRoutes.get("/", getDogsHandler);
dogsRoutes.post("/", postDog);


export default dogsRoutes;