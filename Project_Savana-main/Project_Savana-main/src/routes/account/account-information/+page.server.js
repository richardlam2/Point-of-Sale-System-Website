import { prismaClient } from "$lib/server/prisma"
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const session = await locals.auth.validate()
	const userDetails = await prismaClient.$queryRawUnsafe(`SELECT * FROM public.user_details WHERE id = '${session.user.userId}'`)

    return {
        body: {
          userInfo: userDetails[0]
        }
    };
};

export const actions = {
    default: async ( { request, locals }) => {
		const session = await locals.auth.validate()
        const { 
            FirstName,
            LastName,
            DateOfBirth
        } = Object.fromEntries(
            await request.formData()
        )

        try{
            await prismaClient.user.update({
				where: {
					id: session.user.userId
				},
				data: {
					FirstName: FirstName,
					LastName: LastName,
					DateOfBirth: new Date(DateOfBirth)
				}
			});
        } catch(err) {
            return fail(400, { message: 'Could not update account'})
        }
		
		throw redirect(303, "/account/account-information");
	}
}
