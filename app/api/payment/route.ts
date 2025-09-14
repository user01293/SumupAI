import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY!)


export const POST =async (req:NextRequest)=>{

    const payload=await req.text();
    const sig=req.headers.get('stripe-signature')

    let event;

    


    try{
        event=stripe.webhooks.constructEvent(payload,sig!,process.env.STRIPE_WEBHOOK_SECRET!)
        switch(event.type){
        case 'checkout.session.completed':
            const session=event.data.object as Stripe.Checkout.Session;
            console.log('Checkout session completed',session);
            break;
        case 'customer.subscription.deleted':
            const subscription=event.data.object
            console.log('Customer Subscription deleted',subscription);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
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