import { prismaClient } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia";

export const load = async({ locals })  => {
    const session = await locals.auth.validate()

    if(session) {
        throw redirect(302, "/")
    }
}

export const actions = {
    default: async ( { request }) => {
        const { 
            email, 
            password, 
            FirstName,
            LastName,
            DateOfBirth
        } = Object.fromEntries(
            await request.formData()
        )

        const existingUser = await prismaClient.User.findFirst({
            where: {
                Email: { equals: email }
            }
        })

        if(existingUser != null)
            return fail(400, { message: 'Email is already used.' });

        try{
            const user = await auth.createUser({
				key: {
					providerId: "email", // auth method
					providerUserId: email.toLowerCase(), // unique id when using "username" auth method
					password: password // hashed by Lucia
				},
				attributes: {
					Email: email,
                                        FirstName: FirstName,
                                        LastName: LastName,
                                        DateOfBirth: new Date(DateOfBirth),
                    is_active: true
				}
			});
        } catch(err) {
            return fail(400, { message: 'Could not register user'})
        }

        throw redirect(303, "/login")
    }
}
