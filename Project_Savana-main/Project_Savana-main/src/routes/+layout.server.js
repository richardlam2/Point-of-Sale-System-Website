import { prismaClient } from "$lib/server/prisma";

export const load = async ({ locals }) => {
    const session = await locals.auth.validate()

    let userIsAdmin = null;

    if(session) {
        userIsAdmin = await prismaClient.$queryRawUnsafe(`select is_admin  FROM public."User" WHERE "id" ='${session.user.userId}'`);
    }
    
    return { 
        user: session != null ? session.user : null ,
        isUserActive: userIsAdmin != null ? userIsAdmin[0].is_admin : false
    }
}
