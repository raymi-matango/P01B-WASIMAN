import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const actualizarUsuario = async (req, res) => {
  const userId = req.userId; // Obtenemos el ID del usuario desde el token JWT
  const { nombre, email, telefono, direccion } = req.body; // Obtenemos los nuevos datos del usuario desde la solicitud

  try {
    // Actualizamos los datos del usuario en la base de datos
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: userId }, // Buscamos al usuario por su ID
      data: { nombre, email, telefono, direccion } // Actualizamos los campos correspondientes
    });

    res.status(200).json({ message: "Datos de usuario actualizados correctamente", usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar los datos del usuario" });
  }
};
