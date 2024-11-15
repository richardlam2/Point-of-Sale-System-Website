SELECT
  pd."Id",
  pd."Name",
  pd."CategoryId",
  pd."SellerId",
  pd."Price",
  pd."InventoryCount",
  (
    SELECT
      avg(pr."Rating") AS avg
    FROM
      product_rating pr
    WHERE
      (pr."ProductId" = pd."Id")
  ) AS rating,
  pc."Name" AS product_category
FROM
  (
    (
      (
        product_details pd
        LEFT JOIN product_category pc ON ((pd."CategoryId" = pc."Id"))
      )
      LEFT JOIN seller s ON ((pd."SellerId" = s."Id"))
    )
    LEFT JOIN "User" u ON ((s."Id" = u."SellerId"))
  )
WHERE
  (u.is_active = TRUE);