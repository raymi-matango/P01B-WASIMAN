import express from 'express';
import { verificarToken } from '../middlewares/verificarToken.js';


import { crearReserva, cancelarReserva, verDetalleReservas } from '../controllers/reservasController.js';


const router = express.Router();

router.post('/crear', verificarToken, crearReserva);
router.delete('/cancelar/:id', verificarToken, cancelarReserva);
router.get('/detalles', verificarToken, verDetalleReservas);

export default router;
