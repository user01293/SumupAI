import { isDev } from "./helper";

export const Pricingplans = [
    {
        id:"Basic",
        name:"Basic",
        price:9,
        items:["5 free PDFs per month", "e-mail support","Standard processing"],
        paymentLink : isDev ? 'https://buy.stripe.com/test_00waEY6D9bMJ7KSb3B6c001' : '',
        description : "For personal use and small projects",
        payment:'',
        priceId: isDev ? 'price_1RezwAJEdBXkYi1nGgwcISu5' : ''

    },
    {
        id:"Pro",
        name:"Pro",
        price:19,
        items:["Unlimited PDFs", "24/7 priority support","Priority processing"],
        paymentLink : isDev ? 'https://buy.stripe.com/test_fZu6oI0eL9EB5CK7Rp6c000' : '',
        description : "For professional use and larger projects",
        payment:'',
        priceId: isDev ? 'price_1RezviJEdBXkYi1nkiCFAdFF' : ''
        
    }
]