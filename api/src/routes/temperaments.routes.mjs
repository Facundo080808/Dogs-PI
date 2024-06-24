import { getTemperamentsHandler } from "../handlers/temperaments.handler.mjs";
import express from "express"
const temperamentsRoutes = express.Router();

temperamentsRoutes.get("/", getTemperamentsHandler);

export default temperamentsRoutes;