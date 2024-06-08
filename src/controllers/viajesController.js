import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listarViajes = async (req, res) => {
  try {
    const viajes = await prisma.viaje.findMany({
      include: {
        comentarios: {
          select: {
            comentario: true,
            usuario: {
              select: {
                nombre: true
              }
            }
          }
        }
      }
    });
    res.status(200).json({ viajes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la lista de viajes" });
  }
};

/*export const listarViajes = async (req, res) => {
  try {
    const viajes = await prisma.viaje.findMany();
    res.status(200).json({ viajes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la lista de viajes" });
  }
};  */

export const buscarViajes = async (req, res) => {
  const { nombre, destino, fecha, hora } = req.query;

  try {
    const filtros = {};

    if (nombre) filtros.nombre = { contains: nombre };
    if (destino) filtros.destino = { contains: destino };
    if (fecha) filtros.fecha = { contains: fecha };
    if (hora) filtros.hora = { contains: hora };

    const viajes = await prisma.viaje.findMany({
      where: filtros,
      include: {
        comentarios: {
          include: {
            usuario: {
              select: {
                nombre: true
              }
            }
          }
        }
      }
    });

    res.status(200).json({ viajes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar viajes" });
  }
};
