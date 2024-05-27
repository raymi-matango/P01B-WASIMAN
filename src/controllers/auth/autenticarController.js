import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registrar = async (req, res) => {
  const { nombre, email, clave } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(clave, 10);
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        clave: hashedPassword,
      },
    });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  const { email, clave } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const passwordMatch = await bcrypt.compare(clave, usuario.clave);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    req.session.userId = usuario.id;
    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
