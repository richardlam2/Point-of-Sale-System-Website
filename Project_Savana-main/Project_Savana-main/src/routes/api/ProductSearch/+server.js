import { prismaClient } from "$lib/server/prisma";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
	const searchParam = url.searchParams.get("search");

	const products = await prismaClient.$queryRawUnsafe(`SELECT * FROM public.search_products_grid_view WHERE "Name" ILIKE '%${searchParam}%'`)

	return json(products)
}
