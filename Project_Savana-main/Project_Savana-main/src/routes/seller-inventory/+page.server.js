import { prismaClient } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia";
import { v4 as uuidv4 } from 'uuid';
import  { generateSerialNumber } from '../../../helper/serial_num.js';

let userID = null;

export const load = async ({ locals }) => {
    const session = await locals.auth.validate()

    console.log(session);

    userID = session.user["userId"];
    
    // get user info tuple to get seller id
    const userTuple=  await prismaClient.User.findUnique({
        where: {
          id: userID,
        },
    });
    
    const sellerID = userTuple.SellerId;
    
    
    // find all products
    const products = await prismaClient.product_details.findMany({
        where: {
          SellerId: sellerID,
          IsActive: true,
        },
        include: {
          product_category: {
                select: {
                    Name: true,
                },
            }
          },
      });
      
    
    return { products };
    
 
}
