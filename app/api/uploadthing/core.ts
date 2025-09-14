import { metadata } from "@/app/layout";
import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f=createUploadthing();

export const ourFileRouter={
    pdfUploader: f({pdf: {maxFileSize: '32MB'}}).
    middleware(
        async ({req}) => {
            const user=await currentUser();

            if(!user) throw new UploadThingError("Unauthorized");

            return {userId :user.id }
        }
    ).onUploadComplete(async({metadata, file})=>{
        console.log("metadata", metadata)
        console.log("file", file)
        return {userId: metadata.userId, file: {
      name: file.name,
      size: file.size,
      type: file.type,
      key: file.key,
      url: file.url,      // or file.ufsUrl if you're using UploadThing v9
    }}
    })
}satisfies FileRouter

export type OurFileRouter=typeof ourFileRouter

