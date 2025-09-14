import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core"; //check O o

export const {GET,POST}=createRouteHandler({
    router: ourFileRouter,
    
})