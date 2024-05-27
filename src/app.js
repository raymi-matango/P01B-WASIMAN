import express from "express";
import session from "express-session";

//Importar rutas
import usuariosRoutes from "./routes/admin/usuarios.routes.js";
import viajesRoutes from "./routes/admin/viajes.routes.js";
import reservasRoutes from "./routes/admin/reservas.routes.js";
//autenticar
import autenticarRoutes from "./routes/auth/autenticar.routes.js";

import estudianteReservaRoutes from "./routes/client/estureservas.routes.js"



import { errorHandler } from './middlewares/errorHandler.js';



const app = express();
app.use(express.json());

app.use(
  session({
    secret: "tu-secreto-aqui",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Asegúrate de usar true si estás en producción y usando HTTPS
  })
);

//API REST ADMIN
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/viajes', viajesRoutes);
app.use('/api/reservas', reservasRoutes);

//API REST AUTENTICAR CLIENTE
app.use("/autenticar", autenticarRoutes);
app.use("/reservas-estudiante", estudianteReservaRoutes);

//Error del servidos si cae o no responde el servidor
app.use(errorHandler);

export default app;
