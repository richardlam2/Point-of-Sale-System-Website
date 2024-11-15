import { prismaClient } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";

export async function GET({ locals }) {
    const session = await locals.auth.validate()
	const products = await prismaClient.$queryRawUnsafe(`SELECT * FROM public.order_history_view WHERE "CustomerId" = '${session.user.userId}'`)

    if(!session) {
        return json(
            {
                body: {
                    errorMessage: "Please log in or create an account."
                }
            },
            {
                status: 403
            }
        );
    }
	
	return json(products)
}
