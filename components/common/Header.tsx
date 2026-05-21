// import Link from "next/link";
import NavLink from "./navLink";
import { FileText, SignalMediumIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const isClerkConfigured = clerkPublishableKey && clerkPublishableKey !== 'pk_test_temp_key_for_deployment';
    
    return( <nav className="container flex items-center justify-between  py-4 lg:px-8 px-2 mx-auto">

        <div >
            <NavLink href="/" className="flex items-center gap-1 lg:gap-2">
            <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out"/>
            <span className="font-extrabold lg:text-l text-gray-900">
            SumUp-AI
            </span></NavLink>
        </div>

        

        <div className="flex justify-center gap-4 lg:gap-12">
            <NavLink href="/#pricing">Pricing</NavLink>
            {isClerkConfigured && (
                <SignedIn>
                     <NavLink href="/dashboard">Your Summaries</NavLink> 
                </SignedIn>
            )}
        </div>

        <div className="flex lg:justify-end  ">
            {isClerkConfigured ? (
                <>
                    <SignedIn>
                        <div className="flex justify-center items-center gap-2">
                        <NavLink href="/upload">Upload a PDF</NavLink>
                        <div className="text-amber-600  animate-pulse">Pro</div>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    </SignedIn>
                    <SignedOut>
                    <NavLink href="/sign-in">Sign-in</NavLink>
                    </SignedOut>
                </>
            ) : (
                <div className="text-sm text-gray-500">
                    Authentication not configured
                </div>
            )}
        </div>
        
    </nav>
    )
}