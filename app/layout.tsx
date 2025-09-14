import type { Metadata } from "next";
import { Source_Sans_3 as FontSans}  from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SumUp-AI",
  description: "SumUp AI is an AI-powered platform that helps you summarize your pdfs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  const content = (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        <div   className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster/>
      </body>
    </html>
  );

  // Only wrap with ClerkProvider if keys are available
  if (clerkPublishableKey && clerkPublishableKey !== 'pk_test_temp_key_for_deployment') {
    return <ClerkProvider>{content}</ClerkProvider>;
  }
  
  return content;
}
