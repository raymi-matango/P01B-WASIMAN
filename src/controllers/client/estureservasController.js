import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createReserva = async (req, res) => {
  const { viajeId, estadoReserva } = req.body;
  const usuarioId = req.session.userId;
  const fechaHoraReserva = new Date();

  try {
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId,
        viajeId,
        fechaHoraReserva,
        estadoReserva,
      },
    });
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const getReservas = async (req, res) => {
  const usuarioId = req.session.userId;

  try {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId },
      include: {
        viaje: true,
      },
    });
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

export const deleteReserva = async (req, res) => {
  const usuarioId = req.session.userId;
  const reservaId = parseInt(req.params.id);

  try {
    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId },
    });

    if (!reserva || reserva.usuarioId !== usuarioId) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para eliminar esta reserva" });
    }

    await prisma.reserva.delete({
      where: { id: reservaId },
    });

    res.status(200).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};
