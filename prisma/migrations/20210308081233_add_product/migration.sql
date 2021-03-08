-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `desc` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `type` ENUM('NORMAL', 'SUPER') NOT NULL DEFAULT 'NORMAL',
    `images` JSON,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
