import express from 'express';
import { verificarToken } from '../middlewares/verificarToken.js';
import { crearComentario, verComentarios,eliminarComentario } from '../controllers/comentariosController.js';

const router = express.Router();

router.post('/crear', verificarToken, crearComentario);
router.get('/ver', verificarToken, verComentarios);
router.delete('/eliminar/:id', verificarToken, eliminarComentario); 


export default router;
