import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Calendar1, CalendarArrowDown, ChevronLeft, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SummaryHeader(
    {title,createdAt,summary_text,word_count}:{
    title:string,
    createdAt:string,
    summary_text:string,
    word_count:number
}){
    const readingTime=Math.ceil(word_count/200);
    
    return(
        <div className="flex gap-4 mb-4 justify-between">
            <div>
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <Badge
                        variant="secondary"
                        className="relative px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-xs
                         rounded-full hover:bg-white/90
                          transition-all duration-200 shadow-xs
                           hover:shadow-md"
                        >
                            <Sparkles className="h-4 w-4 mr-1.5 text-rose-500 animate-pulse duration-300" />
                            AI Summary
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CalendarArrowDown className="h-4 w-4 text-rose-400"/>
                            {new Date(createdAt).toLocaleDateString('en-US',
                                {
                                    year:'numeric',
                                    month:'long',
                                    day:'numeric'
                                }
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 text-rose-400"/>
                            {readingTime}<span>min read</span>
                        </div>
                    </div>
                    <h1 className="text-2xl lg:text-4xl font-bold
                    lg:tracking-tight">
                        <span className="bg-linear-to-r from-rose-500/90
                        via-rose-600 to-orange-600 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h1>
                </div>
            </div>

            <div className="self-start">
                <Link href={'/dashboard'}>
                <Button variant={'link'} size={'sm'}
                className="group flex items-center gap-1 sm:gap-1.5
                hover:bg-rose-100/80 backdrop-blur-xs rounded-full
                transition-all duration-200 shadow-xs
                hover:shadow-md border border-rose-100/30
                bg-rose-200/60 px-2 sm:px-3 hover:no-underline">
                    
                    <ChevronLeft className="text-rose-500"/>
                    <span className="text-xs sm:text-sm font-medium
                    text-rose-500/90 ">Back {' '}
                    <span className="hidden sm:inline">To Dashboard</span>

                    </span>
                    
                </Button>
                </Link>
            </div>
        </div>
    )
}


