import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearReserva = async (req, res) => {
  const { viajeId, cantidadAsientos } = req.body;
  const usuarioId = req.userId;

  if (!viajeId || !cantidadAsientos) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const viaje = await prisma.viaje.findUnique({
      where: { id: viajeId },
    });

    if (!viaje) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    if (!viaje.disponible) {
      return res.status(400).json({ error: "El viaje no está disponible" });
    }

    if (cantidadAsientos > viaje.capacidadAsientos) {
      return res
        .status(400)
        .json({ error: "No hay suficientes asientos disponibles" });
    }

    // Crear la reserva
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId,
        viajeId,
        fechaHoraReserva: new Date(),
        estadoReserva: "confirmada",
        cantidadAsientos,
      },
    });

    // Actualizar la capacidad de asientos disponibles en el viaje
    await prisma.viaje.update({
      where: { id: viajeId },
      data: { capacidadAsientos: viaje.capacidadAsientos - cantidadAsientos },
    });

    res.status(201).json({ message: "Reserva creada exitosamente", reserva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const cancelarReserva = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const usuarioId = req.userId;

  try {
    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId },
    });

    if (!reserva || reserva.usuarioId !== usuarioId) {
      return res
        .status(404)
        .json({ error: "Reserva no encontrada o no pertenece al usuario" });
    }

    // Eliminar la reserva
    await prisma.reserva.delete({
      where: { id: reservaId },
    });

    // Devolver los asientos reservados al viaje
    await prisma.viaje.update({
      where: { id: reserva.viajeId },
      data: { capacidadAsientos: { increment: reserva.cantidadAsientos } },
    });

    res.status(200).json({ message: "Reserva cancelada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cancelar la reserva" });
  }
};

export const verDetalleReservas = async (req, res) => {
  const usuarioId = req.userId;

  try {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId },
      include: { viaje: true }, // Incluir información del viaje
    });

    res.status(200).json({ reservas });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener detalles de las reservas" });
  }
};
