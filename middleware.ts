import { clerkMiddleware } from '@clerk/nextjs/server';

// Only use Clerk middleware if keys are configured
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPublishableKey && clerkPublishableKey !== 'pk_test_temp_key_for_deployment';

export default isClerkConfigured ? clerkMiddleware() : (req: any) => {
  return;
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};