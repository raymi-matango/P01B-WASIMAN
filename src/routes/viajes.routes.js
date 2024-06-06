import express from 'express';
import { buscarViajes, listarViajes } from '../controllers/viajesController.js';
import { verificarToken } from '../middlewares/verificarToken.js';

const router = express.Router();

router.get('/buscar', verificarToken, buscarViajes);
router.get('/listar', verificarToken, listarViajes); // Nueva ruta para listar todos los viajes

export default router;
