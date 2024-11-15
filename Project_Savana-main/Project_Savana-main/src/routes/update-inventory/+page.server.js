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
    console.log("here is ipdate inventro search params", searchParams);
    productId = JSON.parse(decodeURIComponent(searchParams.get('productData')));
      
    const products = await prismaClient.$queryRaw`SELECT * FROM public.search_products_grid_view WHERE "Id" = ${productId}::uuid`;
      
    currentCount = products[0].InventoryCount;
    
    return {products};
};




export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
    
        // get form fields    
        const itemsToAdd = parseInt(data.get('newInventory'));
        
        const errors = [];
        
        if (isNaN(itemsToAdd) || itemsToAdd < 0 || !Number.isInteger(itemsToAdd)) {
            errors.push('Inventory Count must be positive integer');
        }
        
        
        if (errors.length > 0 ) {
            console.log("Error validation ", errors);
            throw redirect(303, "/") // This will stop the program's execution
        } 

        // compute updated count
        let newCount = currentCount + itemsToAdd;
        
        let lowInv = null;
        
        if (newCount < 10){
            lowInv = true;
        } else {
            lowInv = false;
        }
        
        // update product details
        try {
            const prodDetails = await prismaClient.product_details.update({
                where: {
                    Id: productId,
                  },
                  data: {
                    InventoryCount: newCount,
                    LowInventory: lowInv,
                  },
            });
        }  catch (err) {
            console.error(err);
            
        }
        
        
        const productTableInfoArray = [];
       
        let serialNum = null;
        // load product tuples - based off inventory count
        for (let i = 0; i < itemsToAdd; i++) {
            serialNum = generateSerialNumber(10);
        
            const generatedGuidForProd = uuidv4();
            const productTableInfo = {
              Id: generatedGuidForProd,
              DetailsId: productId,
              SerialNumber: serialNum,
            };
            productTableInfoArray.push(productTableInfo)
        }
        
        try {
            const createdProducts = await prismaClient.product.createMany({
              data: productTableInfoArray,
            });
            console.log(`Added to products table.`);
          } catch (error) {
            console.error(`Error creating products: ${error}`);
        }
         
        throw redirect(303, "/seller");
    }    
}
    