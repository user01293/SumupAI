'use client'
import { Button } from "@/components/ui/button"
import UploadFormInput from "./uploadFormInput"
import {z} from 'zod'
import { useUploadThing } from "@/utils/uploadthing"
import {toast} from 'sonner'
import {generatePdfSummary, storePdfSummaryAction} from "@/actions/upload-actions"
import { useRef } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"




const Schema=z.object({
    file: z.instanceof(File, {message: "File Invalid"})
    .refine((file)=>file.size<=1024*1024*20,"File greater than 20MB")
    .refine((file)=>file.type.startsWith('application/pdf'),
    "File must be a PDF")
})



export default function UploadForm(){
    const formRef= useRef<HTMLFormElement>(null)
    const [isLoading, setIsLoading]= useState(false)
    const router= useRouter();
    const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
            onClientUploadComplete: () => {
            console.log("Uploaded successfully!");
            toast.success("Uploaded successfully!!", {
                description: "Now Rest Assured."
            });
            },
            onUploadError: (err) => {
            console.error("error occurred while uploading",err);
            toast("Upload",{description:err.message});
            },
            // onUploadBegin: ({ file }) => {
            // console.log("upload has begun for", file);
            // },
        });
    
    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{

        
            e.preventDefault();

            try {
                setIsLoading(true)
                
                const formData= new FormData(e.currentTarget);
            const file=formData.get('file') as File;
            console.log(file);

            //validate file schema with zod
            const validatedFields=Schema.safeParse({file});
            if(!validatedFields.success){
                toast.error("Invalid File",{
                    description : validatedFields.error.flatten().fieldErrors.file?.[0] ??'Invalid File',
                    
                })
                setIsLoading(false)
                return;
            }

            toast.info("Well Done!!",{
                description: "Uploading file...✨",
                className: 'bg-green-100 rounded-lg py-2 px-4 shadow-lg text-white w-96'
            });
            
            //upload the PDF to uploadthing
            const response = await startUpload([file]);
            if(!response){
                toast.error("error uploading file",{
                    description: "error uploading file"
                });
                setIsLoading(false)
                return;
            }

            setTimeout(()=>{
            toast.info("You Know Whats Happening",{
                description: "We're Processing your file...✨"
            });
        },3000)
            //parse the PDF using langchain
            const result = await generatePdfSummary(response);
            
            const{success, data, message}= result || {};

            //summarize the PDF using AI
            if(success && data){
                let storedResult:any
                toast.success(message ?? "Summary Generated ✨",{
                    description: "Saving Summary..."
                })

                console.log(data.summary)

                

                if(data.summary){
                    storedResult= await storePdfSummaryAction({
                        
                        fileUrl: response[0].serverData.file.url,
                        summary: data.summary,
                        title: data.title,
                        fileName: file.name
                    })

                    toast.success( "Summary Saved ✨",{
                    description: "Summary Saved"
                })

                    formRef.current?.reset()
                    if(storedResult.success && storedResult.data?.id){
                        router.push(`/summaries/${storedResult.data.id}`)
                    }
                }
                //redirect to the [id] summary page

                }
        
            } catch (error) {
                console.log(error)
                setIsLoading(true)
            }

            finally{
                setIsLoading(false)
            }
        }
    return(
        
        <div>
           <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
           
        </div>
    )

}