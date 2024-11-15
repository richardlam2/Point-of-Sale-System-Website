import { redirect, fail } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import { prismaClient } from "$lib/server/prisma"
import { json } from "@sveltejs/kit"

export const load = async ({ locals }) => {
    const session = await locals.auth.validate();
    const products = await prismaClient.$queryRawUnsafe(`SELECT * FROM public.checkout_items_view WHERE "UserId" = '${session.user.userId}'`)
    const counts = await prismaClient.product_details.findMany({});
        
    return {
        body: {
            products,
            counts
        }
    };
};