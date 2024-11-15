SELECT
  pd."Id",
  pd."Name",
  pd."Price",
  pd."InventoryCount",
  pd."LowInventory",
  pd."SellerId",
  pc."Name" AS product_category,
  (
    SELECT
      count(*) AS count
    FROM
      (
        product_transaction_mapping ptm
        LEFT JOIN product p ON ((ptm."ProductId" = p."Id"))
      )
    WHERE
      (p."DetailsId" = pd."Id")
  ) AS total_sales,
  (
    SELECT
      sum(pd2."Price") AS sum
    FROM
      (
        (
          product_transaction_mapping ptm
          LEFT JOIN product p ON ((ptm."ProductId" = p."Id"))
        )
        LEFT JOIN product_details pd2 ON ((p."DetailsId" = pd2."Id"))
      )
    WHERE
      (pd2."Id" = pd."Id")
  ) AS total_revenue,
  u.id AS user_id
FROM
  (
    (
      product_details pd
      LEFT JOIN product_category pc ON ((pd."CategoryId" = pc."Id"))
    )
    LEFT JOIN "User" u ON ((pd."SellerId" = u."SellerId"))
  )
WHERE
  (pd."IsActive" <> false);