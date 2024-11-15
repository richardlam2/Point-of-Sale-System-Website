import { prismaClient } from "$lib/server/prisma"
import { json } from "@sveltejs/kit"

export const load = async ({ locals }) => {
    const session = await locals.auth.validate()
	const products = await prismaClient.$queryRawUnsafe(`SELECT * FROM public.checkout_items_view WHERE "UserId" = '${session.user.userId}'`)

    return {
        body: {
           products 
        }
    };
};
