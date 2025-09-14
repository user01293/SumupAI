import  Link  from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckIcon } from "lucide-react"
import { Button } from "../ui/button"

const plans = [
    {
        id:"Basic",
        name:"Basic",
        price:9,
        items:["5 free PDFs per month", "e-mail support","Standard processing"],
        payment : "",
        description : "For personal use and small projects",

    },
    {
        id:"Pro",
        name:"Pro",
        price:19,
        items:["Unlimited PDFs", "24/7 priority support","Priority processing"],
        payement : "",
        description : "For professional use and larger projects",
        payment : "",
    }
]

type PriceType= {
    name:string,
    price:number,
    items:string[],
    description?:string,
    id?:string,
    payment:string,
}


export default function PricingSecion() {
    return (
        <section className="relative overfolw-hidden" id="pricing">
            <div className="py-12 lg:py-24 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center w-full pb-8">
                    <h2 className="uppercase text-xl font-bold text-rose-500">Pricing</h2>
                </div>
                <div className="relative flex flex-col justify-center 
                items-center lg:flex-row lg:items-stretch gap-8">
                    {plans.map((plan) => 
                    <PricingCard key={plan.id} {...plan} />)}
                </div>
            </div>
        </section>
    )
}

const PricingCard = ({name,price,description,items,id,payment}:PriceType) => {
    return (
        <div className="relative w-full max-w-lg hover:scale-105 
        hover:transition-all duration-300">
            <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl hover:border-rose-700",
                id==="Pro" && "border-rose-500 gap-4 border-2")}>
            <div className="flex justify-between item-center gap-4">
                <div>
                    <p className="capitalize text-lg lg:text-xl font-bold">{name}</p>
                    <p className="text-base-content/80 mt-2">{description}</p>
                </div>
            </div>
            <div className="flex gap-2">
                    <p className="text-5xl tracking-tight font-extrabold ">${price}</p>
                    <div className="flex flex-col justify-end mb-[8px]">
                        <p className="font-semibold text-xs">USD</p>
                        <p className="font-semibold text-sm">/month</p>
                    </div>
            </div>
            <div className="space-y-2.5 text-base leading-relaxed flex-1">
                {items.map((item,idx) =>
                     <li key={idx} className="flex items-center gap-2 ">
                        <CheckIcon size={18} className=""></CheckIcon>
                        <span >{item}</span>
                    </li> )
                }
            </div>
            <div className="space-y-2 flex justify-center w-ful">
                <Link
                href={"https://checkout.razorpay.com/v1/checkout.js"} // e.g. 'https://rzp.io/l/abc123'
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "w-full rounded-full flex items-center gap-2 justify-center bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 transition-colors duration-300 border-2 py-1.5 text-white",
                    id === 'Pro'
                    ? "border-rose-800"
                    : "border-rose-100 from-rose-400 to-rose-500"
                )}
                >
                Buy Now <ArrowRight size={18} />
                </Link>
            </div>
            </div>
        </div>
    )
}