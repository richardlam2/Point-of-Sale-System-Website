import { prismaClient } from "$lib/server/prisma";
import { v4 as uuidv4 } from 'uuid';
import  { generateSerialNumber } from '../../../helper/serial_num.js';
import { fail } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"
import { LucideTags } from "lucide-svelte";

let productId = null;
let currentCount = 0;

export const load = async ({ request }) => {
    const { query } = request;
  
    const searchParams = new URL(request.url).searchParams;
    productId = JSON.parse(decodeURIComponent(searchParams.get('productData')));
      
    const products = await prismaClient.$queryRaw`SELECT * FROM public.search_products_grid_view WHERE "Id" = ${productId}::uuid`;
      
    currentCount = products[0].InventoryCount;
    
    return {products};
};


export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
    
        // get form fields    
        const operation = data.get('Operation');

        
        
       // update product details
       try {
        const prodDetails = await prismaClient.product_details.update({
            where: {
                Id: productId,
              },
              data: {
                IsActive: false,
              },
        });
    }  catch (err) {
        console.error(err);
    }
    throw redirect(303, "/seller-inventory2");
    
    
    }
}