-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_ibfk_1`;

-- CreateTable
CREATE TABLE `Website` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `maintenanceId` INTEGER NOT NULL,
    `domain` VARCHAR(191),
    `subdomain` VARCHAR(191),
    `settings` JSON,
    `status` ENUM('ACTIVATED', 'DEACTIVATED') NOT NULL DEFAULT 'DEACTIVATED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),

    UNIQUE INDEX `Website.domain_unique`(`domain`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Maintenance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `websiteId` INTEGER NOT NULL,
    `configType` ENUM('CLOSE_WEBSITE', 'CLOSE_LOGIN', 'CLOSE_REGISTER', 'CLOSE_WITHDRAW', 'CLOSE_DEPOSIT', 'CLOSE_LAUNCHGAME', 'MESSAGE') NOT NULL,
    `configStatus` ENUM('ACTIVATED', 'DEACTIVATED') NOT NULL,
    `startDate` DATETIME(3),
    `endDate` DATETIME(3),
    `message` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3),

    UNIQUE INDEX `Maintenance_websiteId_unique`(`websiteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Website` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maintenance` ADD FOREIGN KEY (`websiteId`) REFERENCES `Website`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
