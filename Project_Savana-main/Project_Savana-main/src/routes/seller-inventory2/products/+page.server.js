import { prismaClient } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	const categories = await prismaClient.product_category.findMany();
	
	const session = await locals.auth.validate()
	let userID = null;
    userID = session.user["userId"];
    
     // get user info tuple to get seller id
    const userTuple=  await prismaClient.User.findUnique({
        where: {
          id: userID,
        },
    });
    

    
    const products = await prismaClient.product_details.findMany({
        where: {
          SellerId: userTuple.SellerId,
          IsActive: true,
        },
        include: {
          product_category: {
                select: {
                    Name: true,
                },
            }
          },
      });
    
    return {products: products,
            categories: categories}
}


// load and query all products for this seller
