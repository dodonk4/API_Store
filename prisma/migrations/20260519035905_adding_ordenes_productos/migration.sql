-- CreateTable
CREATE TABLE "ordenes_productos" (
    "id" SERIAL NOT NULL,
    "ordenId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "precioUnitario" INTEGER DEFAULT 0,
    "fecha" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "estado" VARCHAR(20),

    CONSTRAINT "ordenes_productos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ordenes_productos" ADD CONSTRAINT "ordenes_productos_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "ordenes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes_productos" ADD CONSTRAINT "ordenes_productos_productId_fkey" FOREIGN KEY ("productId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
