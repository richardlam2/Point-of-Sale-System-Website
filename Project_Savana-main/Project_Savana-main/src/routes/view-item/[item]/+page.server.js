import { prismaClient } from "$lib/server/prisma";

export const load = async ({ params }) => {
    const itemId = params.item; // Get the specific ID from the params object
    
    //console.log(itemId);
    const item = await prismaClient.product_details.findUnique({
        where: {
            Id: itemId, // Use the actual value from the params instead of a string literal
        },
    });
    
    return {
        body: {
            item // Return the item in the response body
        }
    };

    
    
    
};


