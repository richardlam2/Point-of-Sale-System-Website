import { prismaClient } from "$lib/server/prisma"
import { json } from "@sveltejs/kit"
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request, locals }) {
    const session = await locals.auth.validate()
    const { transactionInformation, products } = await request.json();

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
	let newProductObjects = [];
	let transactionId = uuidv4()

	for(let id of products) {
		const product = await prismaClient.$queryRawUnsafe(`SELECT "Id" FROM public.product WHERE "DetailsId" = '${id}' limit 1`)

		newProductObjects.push({
			Id: uuidv4(),
			ProductId:product[0].Id,
			TransactionId: transactionId
		});
	}
	const transactionStatus = await prismaClient.$queryRawUnsafe(`SELECT "Id" FROM public.transaction_status WHERE name = 'Completed'`)

    const transactionData = {
        Id: transactionId,
        DateCreated: new Date(),
        DateCompleted: new Date(),
		CustomerId:session.user.userId,
		TotalCost: transactionInformation.totalCost,
		StatusId: transactionStatus[0].Id
	};
    
    try {
        await prismaClient.Transaction.create({
            data: transactionData 
        });

		await prismaClient.product_transaction_mapping.createMany({
			data: newProductObjects
		});

		await prismaClient.product_shopping_cart_mapping.deleteMany({
			where: {
				UserId: session.user.userId
			}
		})
    } catch(err) {
        console.log(err);
    }
    
    return json(
        {
            status: 200
        }
    );
}
