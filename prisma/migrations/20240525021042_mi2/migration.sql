-- AlterTable
ALTER TABLE `viaje` MODIFY `fechaSalida` VARCHAR(191) NULL,
    MODIFY `horaSalida` VARCHAR(191) NULL,
    MODIFY `puntosRecogida` VARCHAR(191) NULL,
    MODIFY `capacidadAsientos` INTEGER NULL,
    MODIFY `disponible` BOOLEAN NOT NULL DEFAULT true;
