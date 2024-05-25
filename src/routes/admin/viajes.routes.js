import express from 'express';
import { consultar, guardar, actualizar, eliminar, buscador } from '../../controllers/admin/viajesController.js';

const router = express.Router();

router.get('/', consultar);
router.post('/', guardar);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);
router.get('/buscar/:destino', buscador);

export default router;
//v1