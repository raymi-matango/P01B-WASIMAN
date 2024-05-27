import express from 'express';
import { estaAutenticado } from '../middlewares/autenticarMiddleware.js';

import { crearReserva, cancelarReserva, verDetalleReservas } from '../controllers/reservasController.js';


const router = express.Router();

router.post('/crear', estaAutenticado, crearReserva);
router.delete('/cancelar/:id', estaAutenticado, cancelarReserva);
router.get('/detalles', estaAutenticado, verDetalleReservas);

export default router;
