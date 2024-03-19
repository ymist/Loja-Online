/*
  Warnings:

  - Added the required column `SKU` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "SKU" TEXT NOT NULL;
