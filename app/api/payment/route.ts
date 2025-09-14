import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null


export const POST =async (req:NextRequest)=>{
    
    if (!stripe) {
        return NextResponse.json({
            status: 'error',
            message: 'Stripe not configured'
        }, { status: 500 })
    }

    const payload=await req.text();
    const sig=req.headers.get('stripe-signature')

    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({
            status: 'error',
            message: 'Missing Stripe configuration'
        }, { status: 500 })
    }

    let event;

    try{
        event=stripe.webhooks.constructEvent(payload,sig,process.env.STRIPE_WEBHOOK_SECRET)
        switch(event.type){
        case 'checkout.session.completed':
            const sessionID=event.data.object.id;
            const session=await stripe.checkout.sessions.retrieve(sessionID,{
                expand:['line_items']
            });

            await handleCheckoutSessionCompleted({session,stripe});
            break;
        case 'customer.subscription.deleted':
            const sessionIDdeleted=event.data.object.id;

            const subscription=event.data.object;

            await handleSubscriptionDeleted({sessionIDdeleted,stripe});
            // console.log('Customer Subscription deleted',subscription);
            break;
        default:
            console.log('Unhandled event type',event.type);
            break;
    }

    }catch(err){
        return NextResponse.json({
            status:'error',
            message:'Webhook verification failed'
        },{status:400})
    }

   

    return NextResponse.json({
        status:'success',
        message:'Hell from stripe API'
    })

}