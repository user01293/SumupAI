'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
interface UploadFormInputProps{
    onSubmit:(e: React.FormEvent<HTMLFormElement>)=>void;
    isLoading:boolean;
}

 const UploadFormInput= forwardRef<HTMLFormElement, UploadFormInputProps>(({onSubmit,isLoading},ref)=>{
    return(
        <div>
             <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex flex-col gap-4 items-center justify-end">
                    <Input type="file" id="file" name="file" 
                    accept="application/pdf" required 
                    className={cn(isLoading && "opacity-50")} disabled={isLoading}/>
                    <Button disabled={isLoading}>{(isLoading) ?<> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Processing...</>  : "Upload your PDF"}</Button>
                </div>

            </form>
        </div>
    )
}
 )

UploadFormInput.displayName= "UploadFormInput";

export default UploadFormInput;

