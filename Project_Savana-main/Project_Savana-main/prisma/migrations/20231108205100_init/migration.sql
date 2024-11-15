-- CreateTable
CREATE TABLE "Customer" (
    "Id" UUID NOT NULL,
    "DateOfBirth" DATE,
    "AccountCredit" DOUBLE PRECISION,

    CONSTRAINT "PK__Customer__3214EC07D2EABD6C" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "DetailsId" UUID NOT NULL,
    "SerialNumber" VARCHAR(255) NOT NULL,

    CONSTRAINT "PK_Product" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "Id" UUID NOT NULL,
    "Name" VARCHAR(255),

    CONSTRAINT "PK__ProductC__3214EC07CA9EDAAF" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProductDetails" (
    "Id" UUID NOT NULL,
    "Name" VARCHAR(300),
    "CategoryId" UUID,
    "SellerId" UUID,
    "Price" DOUBLE PRECISION,
    "InventoryCount" INTEGER,

    CONSTRAINT "PK__ProductD__3214EC0722802DA4" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProductRating" (
    "Id" UUID NOT NULL,
    "Rating" INTEGER,
    "Description" VARCHAR(400),
    "ProductId" UUID,

    CONSTRAINT "PK__ProductR__3214EC07C224CDFF" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProductShoppingCartMapping" (
    "Id" UUID NOT NULL,
    "ProductId" UUID,
    "UserId" TEXT,

    CONSTRAINT "PK__ProductS__3214EC074763A189" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProductTransactionMapping" (
    "Id" UUID NOT NULL,
    "ProductId" UUID NOT NULL,
    "TransactionId" UUID NOT NULL,

    CONSTRAINT "PK_ProductTransactionMapping" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "Id" UUID NOT NULL,
    "CompanyName" VARCHAR(255),

    CONSTRAINT "PK__Seller__3214EC071BE8672B" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "Id" UUID NOT NULL,
    "DateCreated" TIMESTAMP(3) NOT NULL,
    "DateCompleted" TIMESTAMP(3),
    "DateRefunded" TIMESTAMP(3),
    "StatusId" UUID NOT NULL,
    "TotalCost" DOUBLE PRECISION NOT NULL,
    "CustomerId" TEXT,

    CONSTRAINT "PK_Transaction" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "TransactionStatus" (
    "Id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "PK_TransactionStatus" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "FirstName" VARCHAR(30),
    "MiddleName" VARCHAR(30),
    "LastName" VARCHAR(40),
    "Email" VARCHAR(255) NOT NULL,
    "DateOfBirth" DATE,
    "CustomerId" UUID,
    "SellerId" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discounts" (
    "Id" UUID NOT NULL,
    "Percent" DOUBLE PRECISION,
    "ProductId" UUID NOT NULL,
    "Description" UUID,

    CONSTRAINT "PK_Discounts" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");

-- CreateIndex
CREATE INDEX "Key_user_id_idx" ON "Key"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "FK_Product_ProductDetails" FOREIGN KEY ("DetailsId") REFERENCES "ProductDetails"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "FK__ProductDe__Categ__66603565" FOREIGN KEY ("CategoryId") REFERENCES "ProductCategory"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "FK__ProductDe__Selle__6754599E" FOREIGN KEY ("SellerId") REFERENCES "Seller"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductRating" ADD CONSTRAINT "FK__ProductRa__Produ__778AC167" FOREIGN KEY ("ProductId") REFERENCES "ProductDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductShoppingCartMapping" ADD CONSTRAINT "FK__ProductSh__Produ__7B5B524B" FOREIGN KEY ("ProductId") REFERENCES "ProductDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductShoppingCartMapping" ADD CONSTRAINT "FK_ProductShoppingCartMapping_User" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductTransactionMapping" ADD CONSTRAINT "FK_ProductTransactionMapping_Product" FOREIGN KEY ("ProductId") REFERENCES "Product"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductTransactionMapping" ADD CONSTRAINT "FK_ProductTransactionMapping_Transaction" FOREIGN KEY ("TransactionId") REFERENCES "Transaction"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "FK_Transaction_TransactionStatus" FOREIGN KEY ("StatusId") REFERENCES "TransactionStatus"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "FK_Transaction_User" FOREIGN KEY ("CustomerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "FK_User_Customer" FOREIGN KEY ("CustomerId") REFERENCES "Customer"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "FK_User_Seller" FOREIGN KEY ("SellerId") REFERENCES "Seller"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Discounts" ADD CONSTRAINT "FK_Discounts_Discounts" FOREIGN KEY ("Id") REFERENCES "Discounts"("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;
