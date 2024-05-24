# P01 BACKEND - Gestión de viajes compartidos

## Descripción
Este proyecto se enfoca en el desarrollo del backend para una aplicación de gestión de viajes compartidos.

## Instalación
1. Inicia un proyecto de Node.js:
    ```bash
    npm init -y
    ```
2. Instala Prisma como una dependencia de desarrollo:
    ```bash
    npm install prisma --save-dev
    ```
3. Inicializa Prisma:
    ```bash
    npx prisma init
    ```
4. Crea y aplica migraciones de base de datos con Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```
5. Instala las dependencias necesarias:
    ```bash
    npm install express @prisma/client nodemon cors bcryptjs express-session sequelize cookie-parser cookie-session cookie
    ```

