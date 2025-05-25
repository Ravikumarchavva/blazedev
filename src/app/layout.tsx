import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar/page";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ravi Kumar Chavva | Data Analyst & Web Developer",
  description: "Explore Ravi Kumar Chavva's portfolio — data analytics projects, web development work, technical blog posts, and more.",
  keywords: [
    "Ravi Kumar Chavva",
    "Data Analyst",
    "Machine Learning",
    "Web Developer",
    "Portfolio",
    "Projects",
    "Blog",
    "Next.js Developer",
    "India"
  ],
  authors: [{ name: "Ravi Kumar Chavva", url: "https://www.ravikumarchavva.com" }],
  creator: "Ravi Kumar Chavva",
  publisher: "Ravi Kumar Chavva",
  metadataBase: new URL("https://www.ravikumarchavva.com"), 
  // openGraph: {
  //   title: "Ravi Kumar Chavva | Data Analyst & Web Developer",
  //   description: "Data-driven insights and modern web solutions. View projects, read blogs, and explore my tech stack.",
  //   url: "https://www.ravikumarchavva.com",
  //   siteName: "Ravi Kumar Chavva",
  //   images: [
  //     {
  //       url: "/og-image.jpg", // Replace with an actual Open Graph image path
  //       width: 1200,
  //       height: 630,
  //       alt: "Ravi Kumar Chavva",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  twitter: {
    card: "summary_large_image",
    title: "Ravi Kumar Chavva",
    description: "Data Analyst & Full-Stack Developer",
    creator: "@Ravikumarchavva", 
    images: ["/og-image.jpg"],
  },
};


export default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.jpg" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          fontPoppins.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <NavBar />
            {children}
            <Analytics/>
            <SpeedInsights />
          </SessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
