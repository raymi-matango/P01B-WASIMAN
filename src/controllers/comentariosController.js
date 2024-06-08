import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearComentario = async (req, res) => {
  const { viajeId, comentario, calificacion } = req.body;
  const usuarioId = req.userId;

  if (!viajeId || !calificacion) {
    return res
      .status(400)
      .json({ error: "El campo viajeId y calificacion son obligatorios" });
  }

  if (calificacion < 1 || calificacion > 5) {
    return res
      .status(400)
      .json({ error: "La calificación debe estar entre 1 y 5" });
  }

  try {
    // Crear el comentario
    const nuevoComentario = await prisma.comentario.create({
      data: {
        usuarioId,
        viajeId,
        comentario,
        calificacion,
        fecha: new Date(),
      },
    });

    // Obtener todos los comentarios asociados al viaje
    const comentarios = await prisma.comentario.findMany({
      where: { viajeId },
    });

    // Calcular el promedio de las calificaciones
    const totalCalificaciones = comentarios.reduce(
      (total, comentario) => total + comentario.calificacion,
      0
    );
    const promedioCalificaciones = totalCalificaciones / comentarios.length;

    // Actualizar el campo de calificación en el viaje
    await prisma.viaje.update({
      where: { id: viajeId },
      data: { calificacion: promedioCalificaciones },
    });

    res
      .status(201)
      .json({ message: "Comentario creado exitosamente", nuevoComentario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el comentario" });
  }
};


//VEr

export const verComentarios = async (req, res) => {
  const usuarioId = req.userId;

  try {
    const comentarios = await prisma.comentario.findMany({
      where: { usuarioId },
      include: {
        viaje: {
          select: {
            nombre: true, // Ajusta los campos según lo necesario
            destino: true,
            fecha: true,
            hora: true,
          }
        }
      }
    });

    res.status(200).json({ comentarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los comentarios del usuario" });
  }
};

//eliminar
export const eliminarComentario = async (req, res) => {
  const comentarioId = parseInt(req.params.id);
  const usuarioId = req.userId;

  try {
    const comentario = await prisma.comentario.findUnique({
      where: { id: comentarioId },
    });

    if (!comentario || comentario.usuarioId !== usuarioId) {
      return res.status(404).json({ error: "Comentario no encontrado o no pertenece al usuario" });
    }

    // Eliminar el comentario
    await prisma.comentario.delete({
      where: { id: comentarioId },
    });

    // Obtener los comentarios restantes para el viaje
    const comentariosRestantes = await prisma.comentario.findMany({
      where: { viajeId: comentario.viajeId },
      select: { calificacion: true },
    });

    // Calcular la nueva calificación promedio
    const totalCalificaciones = comentariosRestantes.reduce((sum, comentario) => sum + comentario.calificacion, 0);
    const nuevaCalificacionPromedio = comentariosRestantes.length ? totalCalificaciones / comentariosRestantes.length : 0;

    // Actualizar la calificación en el viaje
    await prisma.viaje.update({
      where: { id: comentario.viajeId },
      data: { calificacion: nuevaCalificacionPromedio },
    });

    res.status(200).json({ message: "Comentario eliminado y calificación actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};