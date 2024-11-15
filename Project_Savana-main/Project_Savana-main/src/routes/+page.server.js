import { prismaClient } from "$lib/server/prisma"

export const load = async ({ locals }) => {
const items = await prismaClient.$queryRawUnsafe(`SELECT *
FROM  product_details 
INNER JOIN "User" ON product_details."SellerId" = "User"."SellerId"
where "User".is_active = true
OFFSET 0 ROWS FETCH FIRST 40 ROWS ONLY`)

    return {
        body: {
            items
        }
    };
};
