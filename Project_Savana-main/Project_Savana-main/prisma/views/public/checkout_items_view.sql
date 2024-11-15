SELECT
  pscm."Id",
  pscm."ProductId",
  pscm."UserId",
  pd."Name",
  pd."Price",
  pc."Name" AS product_category
FROM
  (
    (
      product_shopping_cart_mapping pscm
      LEFT JOIN product_details pd ON ((pscm."ProductId" = pd."Id"))
    )
    LEFT JOIN product_category pc ON ((pd."CategoryId" = pc."Id"))
  );