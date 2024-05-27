import express from 'express';
import { buscarViajes, listarViajes } from '../controllers/viajesController.js';
import { estaAutenticado } from '../middlewares/autenticarMiddleware.js';

const router = express.Router();

router.get('/buscar', estaAutenticado, buscarViajes);
router.get('/listar', estaAutenticado, listarViajes); // Nueva ruta para listar todos los viajes

export default router;
