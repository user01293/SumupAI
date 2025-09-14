import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleCheckoutSessionCompleted({session , stripe,}:{
    session: Stripe.Checkout.Session,
    stripe: Stripe
}){
    console.log('Checkout session completed',session);
    const customerID= session.customer as string;
    const customer= await stripe.customers.retrieve(customerID);
    const priceID= session.line_items?.data[0]?.price?.id;

    const sql= await getDbConnection();

    if('email' in customer && priceID){
        const {email,name}=customer;

        await createOrUpdateUser({
            sql,
            email:email as string,
            full_name:name as string,
            customer_id:customerID,
            price_id:priceID as string,
            status:'active'
        })

        await createPayment({
                sql,
                session,
                userEmail:email as string,
                priceID:priceID as string
        })
    }
}


async function createOrUpdateUser({
    sql,
    email,
    full_name,
    customer_id,
    price_id,
    status
}:{sql:any,email:string,full_name:string,customer_id:string,price_id:string,status:string}){
    try {
        
        

        const user = await sql`SELECT * FROM users WHERE email=${email}`;

        if(user.length===0){
            await sql`INSERT INTO users (email,full_name,customer_id,price_id,status) VALUES(${email},${full_name},${customer_id},${price_id},${status})`
        }

    } catch (error) {
        console.log("Error creating or updating user",error);
    }
}

// check Params 🙏
async function createPayment({
    sql,
    session,
    userEmail,
    priceID
}:{sql:any,session:Stripe.Checkout.Session,userEmail:string,priceID:string}){
    try {
        
        const {amount_total,id,status}=session;

        await sql`INSERT INTO payments (amount,user_email,stripe_payment_id,price_id,status) 
        VALUES(${amount_total},${userEmail},${id},${priceID},${status})`
    } catch (error) {
        console.error("Error creating payment",error);
    }
}


export async function handleSubscriptionDeleted({sessionIDdeleted,stripe}:{sessionIDdeleted:string,stripe:Stripe}){
    const subscription=await stripe.subscriptions.retrieve(sessionIDdeleted);

    const sql= await getDbConnection();

    await sql`UPDATE users SET status='cancelled' WHERE customer_id=${subscription.customer}`;
    console.log('Subscription deleted',subscription);
    try {
        
    } catch (error) {
        console.error("Error deleting subscription",error);
    }
}