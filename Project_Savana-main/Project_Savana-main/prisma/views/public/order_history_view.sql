SELECT
  t."Id",
  t."DateCreated",
  ts.name AS transaction_status,
  t."TotalCost",
  t."CustomerId",
  (
    (
      SELECT
        count(*) AS count
      FROM
        product_transaction_mapping ptm
      WHERE
        (ptm."TransactionId" = t."Id")
    )
  ) :: integer AS product_count
FROM
  (
    "Transaction" t
    LEFT JOIN transaction_status ts ON ((t."StatusId" = ts."Id"))
  );