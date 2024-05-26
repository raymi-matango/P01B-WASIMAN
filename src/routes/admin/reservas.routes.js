import express from "express";
import {
  consultar,
  guardar,
  actualizar,
  eliminar,
  buscarPorUsuario,
  buscarPorViaje,
} from "../../controllers/admin/reservasController.js";

const router = express.Router();

router.get("/", consultar);
router.post("/", guardar);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);
router.get("/usuario/:usuarioId", buscarPorUsuario);
router.get("/viaje/:viajeId", buscarPorViaje);
//v1

export default router;