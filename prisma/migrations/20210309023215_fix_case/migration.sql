/*
  Warnings:

  - You are about to drop the column `StartAt` on the `Deal` table. All the data in the column will be lost.
  - You are about to drop the column `EndAt` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `startAt` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endAt` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Deal`
    CHANGE `StartAt`     `startAt` DATETIME(3) NOT NULL,
    CHANGE `Endat` `endAt` DATETIME(3) NOT NULL;
