/*
  Warnings:

  - Made the column `calificacion` on table `viaje` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `viaje` MODIFY `calificacion` DECIMAL(65, 30) NOT NULL DEFAULT 1;
