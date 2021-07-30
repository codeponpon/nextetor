-- CreateTable
CREATE TABLE `VercelProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `websiteId` INTEGER NOT NULL,
    `vercelId` VARCHAR(191),
    `accountId` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3),

    UNIQUE INDEX `VercelProject_websiteId_unique`(`websiteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VercelProject` ADD FOREIGN KEY (`websiteId`) REFERENCES `Website`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
