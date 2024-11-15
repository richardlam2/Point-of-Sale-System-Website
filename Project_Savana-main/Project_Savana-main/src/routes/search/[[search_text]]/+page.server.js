import { prismaClient } from "$lib/server/prisma";

export async function load() {
	const categories = await prismaClient.product_category.findMany();

	return {
		categories: categories
	}
}
