-- CreateTable
CREATE TABLE `advogado` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `serie` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `Especializacao` VARCHAR(100) NOT NULL,
    `Descricao_Profissional` TEXT NULL,
    `Horarios_Disponiveis` VARCHAR(255) NOT NULL,
    `Outras_Informacoes` TEXT NULL,
    `estrelas` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mensagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `remetente_id` VARCHAR(50) NULL,
    `remetente_tipo` ENUM('usuario', 'advogado') NOT NULL,
    `destinatario_id` VARCHAR(50) NULL,
    `destinatario_tipo` ENUM('usuario', 'advogado') NOT NULL,
    `mensagem` TEXT NULL,
    `horario_envio` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `destinatario_id`(`destinatario_id`, `destinatario_tipo`),
    INDEX `remetente_id`(`remetente_id`, `remetente_tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacoes` (
    `id` VARCHAR(191) NOT NULL,
    `mensagem` TEXT NOT NULL,
    `data_envio` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `email` VARCHAR(255) NOT NULL,
    `endereco` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
