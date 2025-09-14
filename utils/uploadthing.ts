import { OurFileRouter } from "@/app/api/uplaodthing/core";
import { generateReactHelpers } from "@uploadthing/react";

export const {useUploadThing} = generateReactHelpers<OurFileRouter>()