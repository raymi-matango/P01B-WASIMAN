/*
  Warnings:

  - You are about to alter the column `fechaHoraReserva` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `reserva` MODIFY `fechaHoraReserva` DATETIME(3) NOT NULL;
