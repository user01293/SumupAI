import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteButton from "./deleteButton";
import Link from "next/link";
import { File, FileText } from "lucide-react";
import { cn } from "@/lib/utils"; 
import {formatDistanceToNow} from 'date-fns'
import { formatFileNameAsTitle } from "@/utils/format-utils";


const SummaryHeader= ({fileUrl,title,createdAt}:{
    fileUrl:string,
    title:string|null,
    createdAt: string,
})=>{
    return <div className="flex items-start gap-2 sm:gap-3 ">
        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 "/>
        <div className="flex-1 min-w-0 ">
            <h3 className="text-base xl:text-lg 
                font-semibold text-gray-900 truncate w-4/5">
                {title || formatFileNameAsTitle(fileUrl)}
            </h3>
            
            <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>

        </div>
    </div>
}

const StatusBadge=({status}:{status:string})=>{
    return <div className={cn('px-3 py-1 text-sm font-medium rounded-full capitalize',
        status==='completed'? 'bg-green-100 text-green-800'  : 'bg-yellow-100 text-yellow-800'
    )}>
        {status}
    </div>
}

export default function SummarryCard({summary}:{
    summary:any;
}){
    return(
        <div className="">
            
            <Card className="relative h-full group">
                <div className="absolute top-2 right-2">
                    <DeleteButton summaryId={summary.id}/>
                </div>
                <Link href={`summaries/${summary.id}`} 
                className="block py-2 px-4">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <SummaryHeader fileUrl={summary.original_file_url}
                        title={summary.title} createdAt={summary.created_at}/>
                        <p className="tex-gray-600/80 line-clamp-2
                        pl-2 text-sm sm:text-base">{summary.summary_text}</p>

                        <div className="flex items-center gap-2 justify-between
                        mt-2 sm:mt-4 ">
                            <StatusBadge status={summary.status}/>
                        </div>
                    </div>
                    
                </Link>
            </Card>
            
        </div>
    )
}