import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const consultar = async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        usuario: true,
        viaje: true,
      },
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};
export const guardar = async (req, res) => {
  try {
    const { usuarioId, viajeId, estadoReserva, cantidadAsientos } = req.body;

    // Convertir la fecha y hora a una cadena de texto en formato ISO 8601
    const fechaHoraReserva = new Date().toISOString();

    // Obtener el viaje correspondiente
    const viaje = await prisma.viaje.findUnique({
      where: { id: viajeId },
    });

    if (!viaje) {
      throw new Error("El viaje especificado no existe");
    }

    // Verificar si hay suficientes asientos disponibles en el viaje
    if (viaje.capacidadAsientos < cantidadAsientos) {
      throw new Error("No hay suficientes asientos disponibles en este viaje");
    }

    // Crear la reserva con la fecha y hora en formato de cadena de texto
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId,
        viajeId,
        fechaHoraReserva,
        estadoReserva,
        cantidadAsientos,
      },
    });

    // Actualizar el número de asientos disponibles en el viaje
    await prisma.viaje.update({
      where: { id: viajeId },
      data: {
        capacidadAsientos: viaje.capacidadAsientos - cantidadAsientos,
      },
    });

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const reservaId = parseInt(req.params.id);
    const nuevoEstadoReserva = req.body.estadoReserva;

    // Verificar si la reserva existe
    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId },
    });

    if (!reserva) {
      return res
        .status(404)
        .json({ error: "La reserva especificada no existe" });
    }

    // Actualizar el estado de la reserva
    const reservaActualizada = await prisma.reserva.update({
      where: { id: reservaId },
      data: { estadoReserva: nuevoEstadoReserva },
    });

    res.json(reservaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reserva" });
  }
};

export const eliminar = async (req, res) => {
  try {
    const reservaId = parseInt(req.params.id);

    // Verificar si la reserva existe
    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId },
      include: { viaje: true },
    });

    if (!reserva) {
      return res
        .status(404)
        .json({ error: "La reserva especificada no existe" });
    }

    // Eliminar la reserva
    await prisma.reserva.delete({ where: { id: reservaId } });

    // Verificar si el viaje asociado a la reserva existe
    if (!reserva.viaje) {
      return res
        .status(500)
        .json({ error: "No se encontró el viaje asociado a la reserva" });
    }

    // Actualizar el número de asientos disponibles en el viaje
    const nuevosAsientosDisponibles =
      reserva.viaje.capacidadAsientos + reserva.cantidadAsientos;
    await prisma.viaje.update({
      where: { id: reserva.viajeId },
      data: { capacidadAsientos: nuevosAsientosDisponibles },
    });

    res.status(200).json({ message: "Reserva cancelada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al cancelar la reserva" });
  }
};

/*export const eliminar = async (req, res) => {
  try {
    const reserva = await prisma.reserva.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar reserva" });
  }
};*/

export const buscarPorUsuario = async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId: parseInt(req.params.usuarioId) },
      include: {
        viaje: true,
      },
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar reservas por usuario" });
  }
};

export const buscarPorViaje = async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({
      where: { viajeId: parseInt(req.params.viajeId) },
      include: {
        usuario: true,
      },
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar reservas por viaje" });
  }
};

/*
export const guardar = async (req, res) => {
  try {
    const { usuarioId, viajeId, estadoReserva, cantidadAsientos } = req.body;

    // Convertir la fecha y hora a una cadena de texto en formato ISO 8601
    const fechaHoraReserva = new Date().toISOString();

    // Crear la reserva con la fecha y hora en formato de cadena de texto
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId,
        viajeId,
        fechaHoraReserva,
        estadoReserva,
        cantidadAsientos,
      },
    });

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/
/*
export const guardar = async (req, res) => {
  try {
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId: req.body.usuarioId,
        viajeId: req.body.viajeId,
        fechaHoraReserva: new Date(),
        estadoReserva: req.body.estadoReserva,
      },
    });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar reserva" });
  }
};*/
