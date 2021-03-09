-- AlterTable
ALTER TABLE `Product` ADD COLUMN     `categoryId` INTEGER;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
