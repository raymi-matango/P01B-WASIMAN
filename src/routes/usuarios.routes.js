import express from 'express';
import { verificarToken } from '../middlewares/verificarToken.js';
import { actualizarUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

// Ruta para actualizar datos de usuario
router.put('/actualizar', verificarToken, actualizarUsuario);

export default router;
