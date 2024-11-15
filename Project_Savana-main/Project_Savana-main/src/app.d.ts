import { PrismaClient } from "@prisma/client";

declare global {
	// See https://kit.svelte.dev/docs/types#app
	// for information about these interfaces
	// and what to do when importing types
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {};
		type DatabaseSessionAttributes = {};
	}

    namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
	}
    
	var prismaClient: PrismaClient
}

export {};