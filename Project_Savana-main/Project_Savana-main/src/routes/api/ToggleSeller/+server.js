import { prismaClient } from "$lib/server/prisma"
import { json } from "@sveltejs/kit"

export async function PUT({ request, locals }) {
    const { sellerId, isActive } = await request.json();
    
    try {
		await prismaClient.user.update({
			where: {
				id: sellerId
			},
			data: {
				is_active: isActive
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
