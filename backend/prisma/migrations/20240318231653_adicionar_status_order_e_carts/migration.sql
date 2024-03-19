/*
  Warnings:

  - You are about to drop the column `draft` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "converted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "draft",
DROP COLUMN "status",
ADD COLUMN     "cancel" BOOLEAN NOT NULL DEFAULT false;
