import { Sparkles,  WandSparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge"

export default function UploadHeader(){
    return(
        <div className="flex flex-col gap-6 items-center justify-center
                text-center">
                    <div className="relative p-[1px] overflow-hidden rounded-full
                    bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
                    <Badge variant={"secondary"} className="rwlative px-6 py-2 
                    flex items-center gap-2 text-base font-medium bg-white
                    rounded-full group hover:bg-gray-50 transition-colors duration-200
                    ">
                        <Sparkles className="h-6 w-6 mr-1 text-rose-600 animate-pulse"/>

                        <p className="text-base">AI Powered Content Creation</p>

                        
                    </Badge>
                    </div>
                    <div className="capitalize text-3xl font-bold
                    tracking-tight text-gray-900 sm:text-4xl flex flex-col gap-2
                    justify-center items-center">
                        <div className="mb-5">
                            Start Uploading{" "}
                            <span className="relative inline-block">
                            <span className="relative z-10 px-2">Your PDFs</span>
                            <span className="absolute inset-0 bg-yellow-300/50 -rotate-2
                            rounded-lg  -skew-y-1 " aria-hidden="true"></span>
                            </span>
                        </div>
                        <div className="mt-2 text-lg leading-2 text-gray-600 sm:text-x max-w-2xl">
                            <p className="flex items-center gap-2">Upload your PDFs and let AI do the magic!{' '}
                            <WandSparkles className="inline-block h-4 w-4 text-rose-500 animate-pulse 
                            transition-colors duration-800"></WandSparkles>
                        </p>
                        </div>
                    </div>
                </div>
    )
}