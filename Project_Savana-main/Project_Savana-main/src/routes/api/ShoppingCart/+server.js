import { prismaClient } from "$lib/server/prisma"
import { json } from "@sveltejs/kit"
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request, locals }) {
    const session = await locals.auth.validate()
    const { productId } = await request.json();

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

    const existingItem = await prismaClient.$queryRawUnsafe(`SELECT * FROM public.product_shopping_cart_mapping WHERE "ProductId" = '${productId}' and "UserId" = '${session.user.userId}'`)

    if(existingItem.length > 0) {
        return json(
            {
                body: {
                    errorMessage: "This item is already in your shopping cart."
                }
            },
            {
                status: 403
            }
        );
    }

    const product = await prismaClient.$queryRawUnsafe(`SELECT "InventoryCount" FROM public.product_details WHERE "Id" = '${productId}'`)

    if(product[0].InventoryCount === 0) {
        return json(
            {
                body: {
                    errorMessage: "This item is out of stock."
                }
            },
            {
                status: 403
            }
        );
    }


    const shoppingCartData = {
        Id: uuidv4(),
        ProductId: productId,
        UserId:session.user.userId
    }
    
    try {
        await prismaClient.product_shopping_cart_mapping.create({
            data: shoppingCartData
        });
    } catch(err) {
        console.log(err);
    }
    
    return json(
        {
            status: 200
        }
    );
}

export async function DELETE({ url }) {
    const shoppingCartItemId = url.searchParams.get("shoppingCartItemId");
    
    await prismaClient.product_shopping_cart_mapping.delete({
        where: {
            Id: shoppingCartItemId
        }
    })

    return json(
        {
            status: 200
        }
    );
}
