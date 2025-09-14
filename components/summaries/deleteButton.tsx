'use client'

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react";
import deleteSummaryAction from "@/actions/summary-actions";

interface DeleteButtonProps{
    summaryId:string;
}

export default function DeleteButton({summaryId}:DeleteButtonProps){
    const [open,setOpen]=useState(false);
    const [isPending,startTransition]=useTransition();

    const handleDelete=async ()=>{
        startTransition(async()=>{
        const result= await deleteSummaryAction({summaryId});
        if(result.success){
            toast.success("Summary deleted successfully");
        }else{
            toast.error("Failed to delete summary");
        }
        setOpen(false);
    })
    }



    return(
        

        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button  size={'icon'}
            className="text-gray-400 bg-gray-50 border 
            border-gray-200 hover:text-rose-600 hover:bg-rose-50
            hover:border-rose-200 transition-all duration-300">
                <Trash2 className="w-4 h-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Delete Summary</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete this summary? This action cannot be undone.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'outline'} onClick={()=>setOpen(false)}>Cancel</Button>
                <Button onClick={handleDelete}>{isPending ? 'Deleting...' : 'Delete'}</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

    )
}