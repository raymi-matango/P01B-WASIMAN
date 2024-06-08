/*
  Warnings:

  - You are about to alter the column `fecha` on the `viaje` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `comentario` MODIFY `fecha` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `reserva` MODIFY `asiento` INTEGER NULL,
    MODIFY `estado` VARCHAR(191) NULL,
    MODIFY `fecha` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `viaje` MODIFY `fecha` DATETIME(3) NULL;
