import express from 'express';
import { consultar, guardar, actualizar, eliminar, buscador } from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', consultar);
router.post('/', guardar);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);
router.get('/buscar/:nombre', buscador);

export default router;
