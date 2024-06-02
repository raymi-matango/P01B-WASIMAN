import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Registro de usuarios
export const registrar = async (req, res) => {
  const { nombre, email, clave } = req.body;

  // Validación de campos
  if (!nombre || !email || !clave) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el email ya está registrado
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Crear el usuario en la base de datos
    await prisma.usuario.create({
      data: {
        nombre,
        email,
        clave: hashedPassword,
      },
    });

    // Responder con éxito
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Inicio de sesión de usuarios
export const login = async (req, res) => {
  const { email, clave } = req.body;

  // Validación de campos
  if (!email || !clave) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Buscar el usuario por email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(clave, usuario.clave);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Establecer la sesión del usuario
    req.session.userId = usuario.id;

    // Devolver el nombre del usuario junto con el mensaje de éxito
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      username: usuario.nombre, // Asegúrate de que el nombre de usuario esté incluido aquí
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

//es un buen codigo:
/*import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Registro de usuarios
export const registrar = async (req, res) => {
  const { nombre, email, clave } = req.body;

  // Validación de campos
  if (!nombre || !email || !clave) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el email ya está registrado
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Crear el usuario en la base de datos
    await prisma.usuario.create({
      data: {
        nombre,
        email,
        clave: hashedPassword,
      },
    });

    // Responder con éxito
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Inicio de sesión de usuarios
export const login = async (req, res) => {
  const { email, clave } = req.body;

  // Validación de campos
  if (!email || !clave) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Buscar el usuario por email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(clave, usuario.clave);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Establecer la sesión del usuario
    req.session.userId = usuario.id;
    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};*/
