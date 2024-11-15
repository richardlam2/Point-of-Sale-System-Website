import { prismaClient } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia";
import { v4 as uuidv4 } from 'uuid';


let userID = null;

export const load = async ({ locals }) => {
    const session = await locals.auth.validate()
    
    userID = session.user["userId"];  
}


export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
    
        // get form fields    
        const companyName = data.get('CompanyName');
        
        const errors = [];
        
        if (!companyName || companyName.trim() === '') {
            errors.push('Company Name must be provided');
        }
        
        if (errors.length > 0 ) {
            console.log("Company name not provided");
            console.log(errors);
            throw redirect(303, "/seller-info") // This will stop the program's execution
        }
        
        const generatedGuid = uuidv4();
        const sellerData = {
            Id: generatedGuid,
            CompanyName: companyName
        };
        
        
        try {
            const sellerDetails = await prismaClient.seller.create({
              data: sellerData,
            });
        }  catch (err) {
            console.error(err);
            // Handle the error as needed
        }
        
        // update user table
        try {
            const userDetails = await prismaClient.user.update({
                where: {
                    id: userID,
                  },
                  data: {
                    SellerId: generatedGuid,
                  },
            });
        }  catch (err) {
            console.error(err);
            
        }
        
        throw redirect(303, "/seller")
    }
        

        
       
    }
    

