'use server'

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAi } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";


export async function generatePdfSummary(uploadResponse: {
  serverData: {
    userId: string,
    file: {
      url: string,
      name: string,
    }
  }
}[]) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const { serverData: { userId, file: { url: pdfUrl, name: fileName } } } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("Calling OpenAI at", new Date().toISOString());

    let summary;

    try {
      summary = await generateSummaryFromOpenAi(pdfText);
      if(summary) console.log("ChatGPT API generated summary", summary);
    } catch (error) {
      console.error(error);

      if (error instanceof Error && error.message.includes("Rate limit exceeded")) {
        console.log("Calling Gemini at", new Date().toISOString());
        try {
          summary = await generateSummaryFromGemini(pdfText);
          if(summary) console.log("Gemini API generated summary", summary);
        } catch (geminiError) {
          console.error("Gemini API also failed after OpenAI quota finished");
          return {
            success: false,
            message: "Failed to generate summary with available AI providers",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "Summary generation failed due to unexpected error",
          data: null,
        };
      }
    }



    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName= formatFileNameAsTitle(fileName)

    return {
      success: true,
      message: "Summary generated successfully",
      data: { 
        summary ,
        title: formattedFileName
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

interface PdfSummaryType{
  
  userId?: string,
  fileUrl: string,
  summary: string,
  title: string,
  fileName: string

}

export async function savePdfSummary(
  {userId,fileUrl, summary,title,fileName}:PdfSummaryType){
  //sql inserting pdf summary

  try {
    const sql= await getDbConnection()
    const [savedSummary]= await sql`INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
    ) VALUES (
  ${userId},
  ${fileUrl},
  ${summary},
  ${title},
  ${fileName}
    ) returning id`
    return savedSummary;
  } catch (error) {
    console.error('Error saving pdf summary', error)
    throw error;
  }

}

export async function storePdfSummaryAction(
  {fileUrl, summary,title,fileName}:PdfSummaryType
) {
  //user is logged in and has a userid
  // savePdfSummary
  // savePdfSummary()
  let savedSummary:any
  try {
    const {userId} = await auth();
    if(!userId){
      return {
        success: false,
      message: 'User not found',
      }
    }
    savedSummary = await savePdfSummary({userId,fileUrl,summary,title,fileName});
    if(!savedSummary){
      return {
        success: false,
        message: 'Error saving pdf summary',
      }
    }
    
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message
      : 'Error saving pdf summary',
      
    };
  }

  //revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`)

  return {
      success: true,
      message: 'Pdf summary saved successfully',
      data:{
        id: savedSummary.id 
      }
    }
}