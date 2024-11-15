import { prismaClient } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const session = await locals.auth.validate()
    
    const existingUser = await prismaClient.User.findFirst({
        where: {
            id: { equals: session.user["userId"] }
        }
    })
    
    const sellerID = existingUser.SellerId;
    
    if(sellerID == undefined){
        throw redirect(303, "/seller-info")
    } else{
        throw redirect(303, "/seller-inventory2/products")
    }
}

