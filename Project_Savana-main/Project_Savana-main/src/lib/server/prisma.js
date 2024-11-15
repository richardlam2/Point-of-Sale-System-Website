import {PrismaClient} from "@prisma/client"

global.prismaClient;

const prismaClient = global.prismaClient || new PrismaClient();

if(process.env.NODE_ENV === "development") {
    global.prismaClient = prismaClient;
}

export { prismaClient }; 