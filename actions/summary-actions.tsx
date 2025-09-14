'use server'
import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";



export default async function deleteSummaryAction({summaryId}:{summaryId:string}){
    const user= await currentUser();
    
    if(!user){
        throw new Error("User not found");
    }

    const userId= user.id;

    try {
        const sql= await getDbConnection();

        const result= await sql`Delete from pdf_summaries where
        id=${summaryId} and user_id=${userId}
        returning id`;

        if(result.length>0){
            revalidatePath('/dashboard')
            return {success:true}
        }
        return {success:false}


        
    } catch (error) {
        console.error("Error Deleting Summary",error);
        return {success:false}
    }

}