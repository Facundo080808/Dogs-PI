import  Router  from 'express';
import Temperaments from "./temperaments.routes.mjs";
import dogsRoutes from './dogs.routes.mjs';

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router.Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRoutes);
router.use("/temperaments",Temperaments );

export default router;
