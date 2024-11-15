import { prismaClient } from "$lib/server/prisma"

export const load = async ({ locals }) => {
    const sellers = await prismaClient.$queryRawUnsafe(`SELECT * FROM public."User" * WHERE "SellerId" IS NOT NULL`)

    return {
        body: {
            sellers
        }
    };

};
