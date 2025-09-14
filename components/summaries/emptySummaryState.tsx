import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmptySummaryState(){
    return(
        <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
                <FileText className="h-16 w-16 text-gray-400"/>
                <h2 className="text-xl font-semibold text-gray-700">No Summaries Yet</h2>
                <p className="text-gray-600">Upload your first PDF to get started with SumUp AI</p>
                
                <Link href={'/upload'}>
                    <Button variant={'link'} className="mt-4 text-white
                    bg-linear-to-r from-rose-500 to-rose-700 
                    hover:from-rose-700 hover:to-rose-500 
                    hover:no-underline  transition-all duration-300">
                        Create your first summary</Button>
                </Link>
                
            </div>
        </div>
    )
}