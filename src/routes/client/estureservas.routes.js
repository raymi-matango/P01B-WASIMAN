import express  from "express";
import {
    createReserva,
    getReservas,
    deleteReserva,
  } from "../../controllers/client/estureservasController.js";

import { estaAutenticado } from "../../middlewares/autenticarMiddleware.js";

const router = express.Router();

router.post("/crear", estaAutenticado, createReserva);
router.get("/mis-reservas", estaAutenticado, getReservas);
router.delete("/eliminar/:id", estaAutenticado, deleteReserva);

export default router;

