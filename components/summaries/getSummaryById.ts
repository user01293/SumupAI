import { getDbConnection } from "@/lib/db";

export default async function getSummaryById(id:string){
    // Validate that id is not undefined, null, or empty
    if (!id || id === 'undefined' || id === 'null') {
        console.error('Invalid id parameter:');
        return null;
    }

    try {
        const sql= await getDbConnection();
        const [result]= await sql`SELECT id, 
        user_id, 
        title, 
        original_file_url,
        summary_text,
        created_at,
        updated_at,
        status, 
        file_name, 
        LENGTH(summary_text) - LENGTH(REPLACE
        (summary_text, ' ', '')) + 1 as word_count from
        pdf_summaries where id = ${id} `;
        return result;
    } catch (error) {
        console.error('Error getting summary by id',error);
        return null;
    }

    //1 2 5 4 3 2 1
}