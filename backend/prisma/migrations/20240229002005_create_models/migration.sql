-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOnOrder" (
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "ProductOnOrder_pkey" PRIMARY KEY ("product_id","order_id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnOrder" ADD CONSTRAINT "ProductOnOrder_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnOrder" ADD CONSTRAINT "ProductOnOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
