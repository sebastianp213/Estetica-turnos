-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `rol` ENUM('CLIENTE', 'PROFESIONAL', 'ADMIN') NOT NULL DEFAULT 'CLIENTE',
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profesionales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `descripcion` TEXT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `profesionales_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tratamientos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `duracion_minutos` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tratamientos_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profesional_tratamiento` (
    `profesional_id` INTEGER NOT NULL,
    `tratamiento_id` INTEGER NOT NULL,

    PRIMARY KEY (`profesional_id`, `tratamiento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horarios_atencion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profesional_id` INTEGER NOT NULL,
    `dia_semana` ENUM('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO') NOT NULL,
    `hora_inicio` TIME(0) NOT NULL,
    `hora_fin` TIME(0) NOT NULL,

    UNIQUE INDEX `horarios_atencion_profesional_id_dia_semana_key`(`profesional_id`, `dia_semana`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NOT NULL,
    `profesional_id` INTEGER NOT NULL,
    `tratamiento_id` INTEGER NOT NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fin` DATETIME(3) NOT NULL,
    `precio_aplicado` DECIMAL(10, 2) NOT NULL,
    `estado` ENUM('CONFIRMADO', 'COMPLETADO', 'CANCELADO') NOT NULL DEFAULT 'CONFIRMADO',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `reservas_cliente_id_inicio_idx`(`cliente_id`, `inicio`),
    INDEX `reservas_profesional_id_inicio_fin_idx`(`profesional_id`, `inicio`, `fin`),
    INDEX `reservas_estado_inicio_idx`(`estado`, `inicio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profesionales` ADD CONSTRAINT `profesionales_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profesional_tratamiento` ADD CONSTRAINT `profesional_tratamiento_profesional_id_fkey` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profesional_tratamiento` ADD CONSTRAINT `profesional_tratamiento_tratamiento_id_fkey` FOREIGN KEY (`tratamiento_id`) REFERENCES `tratamientos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horarios_atencion` ADD CONSTRAINT `horarios_atencion_profesional_id_fkey` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_profesional_id_fkey` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_tratamiento_id_fkey` FOREIGN KEY (`tratamiento_id`) REFERENCES `tratamientos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
