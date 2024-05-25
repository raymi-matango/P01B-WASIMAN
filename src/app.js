import express from "express";
import session from "express-session";
import usuariosRoutes from "./routes/admin/usuarios.routes.js";
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();
app.use(express.json());

app.use(
  session({
    secret: "pachakamak2024",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Asegúrate de usar true si estás en producción y usando HTTPS
  })
);

//API REST ADMIN
app.use('/api/usuarios', usuariosRoutes);



//Error del servidos si cae o no responde el servidor
app.use(errorHandler);
export default app;
//version 1