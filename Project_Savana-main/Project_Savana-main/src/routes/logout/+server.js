import { auth } from "$lib/server/lucia";
import { redirect } from "@sveltejs/kit";

export const POST = async ({ locals }) => {
    console.log("logout");
    const session = await locals.auth.validate();

    if(!session) {
        throw redirect(302, "/");
    }

    await auth.invalidateSession(session.sessionId); 
    locals.auth.setSession(null);

    throw redirect(302, "/");
}