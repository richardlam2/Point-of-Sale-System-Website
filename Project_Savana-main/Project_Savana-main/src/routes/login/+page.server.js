import { redirect, fail } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

export const load = async ({ locals }) => {
    const session = await locals.auth.validate()

    if(session) {
        throw redirect(302, "/");
    }
}

export const actions = {
    default: async ({request, locals }) => {
        const { email, password } = Object.fromEntries(
            await request.formData()
        )

        try {
            const key = await auth.useKey(
                "email", 
                email.toLowerCase(), 
                password
            );

            const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});

            locals.auth.setSession(session);
        } catch (e) {
			if ((e.message === "AUTH_INVALID_KEY_ID" ||
					e.message === "AUTH_INVALID_PASSWORD")
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: "Incorrect username or password"
				});
			}
			return fail(500, {
				message: "An unknown error occurred"
			});
		}

        throw redirect(302, '/')
    }
}