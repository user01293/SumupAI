
import BgGradient from "@/components/common/BgGradient";
import SummarryCard from "@/components/summaries/summarryCard";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { link } from "fs";
import { ArrowRight, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import EmptySummaryState from "@/components/summaries/emptySummaryState";


export default async function DashboardPage(){
    const user= await currentUser();
    if(!user){
        return redirect('/sign-in');
    }
    const userId= user.id;
    const uploadLimit = 5;
    const summaries = await getSummaries(userId)

    
    return(
        <main className="min-h-screen ">
            <BgGradient/>

            <div className="flex flex-col container mx-auto gap-4">
                <div className="px-2 py-12 sm:py-24">
                    <div className="flex justify-between gap-4 mb-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold tracking-tight 
                            bg-linear-to-r from-gray-600 to-gray-900
                             bg-clip-text text-transparent">
                                Your Summaries
                            </h1>
                            <p className="text-gray-600">
                                Transform your PDFs into concise,actionable insights.
                            </p>
                        </div>
                
                    <Button variant={"link"} className="bg-linear-to-r from-rose-500
                    to-rose-700 hover:from-rose-700 hover:to-rose-500 hover:scale-105
                    transition-all duration-300 group hover:no-underline">
                        <Link href="/upload">
                            <div className="flex items-center text-white
                            ">
                                <Plus className="w-5 h-5 mr-2"/>New Summary
                            </div>
                        
                        </Link>
                    </Button>
                    </div>
                    <div className="mb-6">
                        <div className="bg-rose-50 border border-rose-200
                        rounded-lg p-3 text-rose-800">
                            <div className="text-sm">
                                You've reached your limits of {uploadLimit} uploads on the basic plan.{' '}
                                <Link href="/#pricing" className="animate-pulse transition-all duration-500 
                                 inline-block mx-2">
                                    <div className="text-rose-800 underline underline-offset-4
                                    inline-flex items-center font-medium" >
                                        Upgrade to Pro{' '}
                                        <ArrowRight className="w-4 h-4 inline-block"/>{' '}
                                    </div>
                                    
                                </Link>
                                for unlimited uploads
                                
                            </div>
                        </div>
                    </div>
                    {summaries.length===0 ? <EmptySummaryState/> :<div className="grid gird-cols-1 md:grid-cols-2
                    lg:grid-cols-3 gap-4 sm:gap-6">
                        {summaries.map((summary,index)=>(
                            <SummarryCard key={index} summary={summary}/>
                        ))}
                    </div>}
                 </div>
                
            </div>

        </main>
    )
}