import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const consultar = async (req, res) => {
  try {
    const viajes = await prisma.viaje.findMany();
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener viajes" });
  }
};

export const guardar = async (req, res) => {
  try {
    const viaje = await prisma.viaje.create({ data: req.body });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar viaje" });
  }
};

export const actualizar = async (req, res) => {
  try {
    const viaje = await prisma.viaje.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar viaje" });
  }
};

export const eliminar = async (req, res) => {
  try {
    const viaje = await prisma.viaje.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar viaje" });
  }
};

export const buscador = async (req, res) => {
  const destino = req.params.destino.toLowerCase();
  try {
    const viajes = await prisma.viaje.findMany({
      where: { destino: { contains: destino } },
    });
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar viajes" });
  }
};
