/*
  Warnings:

  - You are about to drop the column `address_id` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_address_id_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "address_id";
