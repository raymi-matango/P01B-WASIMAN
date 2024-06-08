/*
  Warnings:

  - You are about to drop the column `cantidadAsientos` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `estadoReserva` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `fechaHoraReserva` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `capacidadAsientos` on the `viaje` table. All the data in the column will be lost.
  - You are about to drop the column `detalles` on the `viaje` table. All the data in the column will be lost.
  - You are about to drop the column `fechaSalida` on the `viaje` table. All the data in the column will be lost.
  - You are about to drop the column `horaSalida` on the `viaje` table. All the data in the column will be lost.
  - You are about to drop the column `puntosRecogida` on the `viaje` table. All the data in the column will be lost.
  - Added the required column `asiento` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reserva` DROP COLUMN `cantidadAsientos`,
    DROP COLUMN `estadoReserva`,
    DROP COLUMN `fechaHoraReserva`,
    ADD COLUMN `asiento` INTEGER NOT NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL,
    ADD COLUMN `ubicacion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `direccion` VARCHAR(191) NOT NULL DEFAULT 'Quito',
    ADD COLUMN `telefono` VARCHAR(191) NOT NULL DEFAULT '0999999999';

-- AlterTable
ALTER TABLE `viaje` DROP COLUMN `capacidadAsientos`,
    DROP COLUMN `detalles`,
    DROP COLUMN `fechaSalida`,
    DROP COLUMN `horaSalida`,
    DROP COLUMN `puntosRecogida`,
    ADD COLUMN `asiento` INTEGER NULL,
    ADD COLUMN `correo` VARCHAR(191) NULL,
    ADD COLUMN `detalle` VARCHAR(191) NULL,
    ADD COLUMN `facultad` VARCHAR(191) NULL,
    ADD COLUMN `fecha` DATETIME(3) NULL,
    ADD COLUMN `foto` VARCHAR(191) NULL,
    ADD COLUMN `hora` VARCHAR(191) NULL,
    ADD COLUMN `nombre` VARCHAR(191) NULL,
    ADD COLUMN `origen` VARCHAR(191) NULL,
    ADD COLUMN `telefono` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Comentario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `viajeId` INTEGER NOT NULL,
    `comentario` VARCHAR(191) NULL,
    `calificacion` INTEGER NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_viajeId_fkey` FOREIGN KEY (`viajeId`) REFERENCES `Viaje`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
