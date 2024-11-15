import { prismaClient } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia";
import { v4 as uuidv4 } from 'uuid';
import  { generateSerialNumber } from '../../../helper/serial_num.js';
import { LucideTable2 } from "lucide-svelte";

let sellerId= null;
export const load = async ({ locals }) => {
    const session = await locals.auth.validate()
    
    const existingUser = await prismaClient.User.findFirst({
        where: {
            id: { equals: session.user["userId"] }
        }
    })
    
    sellerId = existingUser.SellerId;
    
    
}


export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
    
        // get form fields    
        const productName = data.get('ProductName');
        const priceProduct = parseFloat(data.get('PriceProduct')); 
        const inventoryCount = parseInt(data.get('InventoryCount'));
        const category = data.get('Category');
        
        const errors = [];
        if (!productName || productName.trim() === '') {
            errors.push('Product Name must be provided');
        }
          
        if (isNaN(priceProduct) || priceProduct <= 0) {
            errors.push('Price must be a valid number > 0');
        }
          
        if (isNaN(inventoryCount) || inventoryCount < 0 || !Number.isInteger(inventoryCount)) {
            errors.push('Inventory Count must be positive integer');
        }
          
        if (!category || category.trim() === '') {
            errors.push('Category is required');
        }
        
        // add record into db
        
        if (errors.length > 0 ) {
            console.log("One of the fields was invalid");
            console.log(errors);
            throw redirect(303, "/product-form") // This will stop the program's execution
        }
        const generatedGuid = uuidv4();
        
        // get the prod id
        const catTuple=  await prismaClient.product_category.findMany({
            where: {
                Name: category,
            },
        });
        
        const categoryId = catTuple[0].Id;
        let lowInv = null;
        
        if (inventoryCount < 10){
            lowInv = true;
        } else {
            lowInv = false;
        }
  
        try {
            const newProduct = await prismaClient.product_details.create({
                data: {
                  Id: generatedGuid,
                  Name: productName, 
                  CategoryId: categoryId, 
                  SellerId: sellerId, 
                  Price: priceProduct, 
                  InventoryCount: inventoryCount,
                  LowInventory: lowInv,
                },
              });
        }  catch (err) {
            console.error(err);
        }
        
       
        
        
        const productTableInfoArray = [];
       
        let serialNum = null;
        // load product tuples - based off inventory count
        for (let i = 0; i < inventoryCount; i++) {
            serialNum = generateSerialNumber(10);
        
            const generatedGuidForProd = uuidv4();
            const productTableInfo = {
              Id: generatedGuidForProd,
              DetailsId: generatedGuid,
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
          throw redirect(303, "/seller-inventory2");
         
        
        
    }
    
}

