/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Brand`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Brand.name_unique` ON `Brand`(`name`);
