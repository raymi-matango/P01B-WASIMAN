import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const buscarViajes = async (req, res) => {
  const { destino, fechaSalida, horaSalida, puntosRecogida, capacidadAsientos, disponible } = req.query;

  try {
    const filtros = {};

    if (destino) filtros.destino = { contains: destino };
    if (fechaSalida) filtros.fechaSalida = { equals: fechaSalida };
    if (horaSalida) filtros.horaSalida = { equals: horaSalida };
    if (puntosRecogida) filtros.puntosRecogida = { contains: puntosRecogida };
    if (capacidadAsientos) filtros.capacidadAsientos = { gte: parseInt(capacidadAsientos) };
    if (disponible !== undefined) filtros.disponible = disponible === 'true';

    const viajes = await prisma.viaje.findMany({
      where: filtros,
    });

    res.status(200).json({ viajes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar viajes" });
  }
};

export const listarViajes = async (req, res) => {
  try {
    const viajes = await prisma.viaje.findMany();
    res.status(200).json({ viajes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la lista de viajes" });
  }
};
