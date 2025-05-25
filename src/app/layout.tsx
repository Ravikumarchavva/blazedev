// Local Imports
import "@/styles/globals.css";
import NavBar from "@/components/NavBar/page";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";

// Authentication Imports
import { SessionProvider } from "next-auth/react";

// For vercel analytics and speed insights
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// External Imports
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ravi Kumar Chavva | Data Analyst & Web Developer",
  description:
    "Explore Ravi Kumar Chavva's portfolio — data analytics projects, web development work, technical blog posts, and more.",
  keywords: [
    "Ravi Kumar Chavva",
    "ravikumarchavva",
    "Data Analyst",
    "Machine Learning",
    "Web Developer",
    "Portfolio",
    "Projects",
    "Blog",
    "Next.js Developer",
    "India",
  ],
  authors: [
    { name: "Ravi Kumar Chavva", url: "https://www.ravikumarchavva.com" },
  ],
  creator: "Ravi Kumar Chavva",
  publisher: "Ravi Kumar Chavva",
  metadataBase: new URL("https://www.ravikumarchavva.com"),
  twitter: {
    title: "Ravi Kumar Chavva",
    description: "Data Analyst & Full-Stack Developer",
    creator: "@Ravikumarchavva",
    images: ["/icon.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/icon.jpg" />
        <link rel="canonical" href="https://www.ravikumarchavva.com" />
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Ravi Kumar Chavva | Data Analyst & Web Developer"
        />
        <meta
          property="og:description"
          content="Explore Ravi Kumar Chavva's portfolio — data analytics projects, web development work, technical blog posts, and more."
        />
        <meta property="og:url" content="https://www.ravikumarchavva.com" />
        <meta property="og:image" content="/icon.jpg" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content="Ravi Kumar Chavva" />
        <meta
          name="twitter:description"
          content="Data Analyst & Full-Stack Developer"
        />
        <meta name="twitter:creator" content="@Ravikumarchavva" />
        <meta name="twitter:image" content="/icon.jpg" />
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ravi Kumar Chavva",
              url: "https://www.ravikumarchavva.com",
              sameAs: [
                "https://twitter.com/Ravikumarchavva",
                // Add other social profiles if available
              ],
              jobTitle: "Data Analyst & Web Developer",
              image: "/icon.jpg",
              description:
                "Explore Ravi Kumar Chavva's portfolio — data analytics projects, web development work, technical blog posts, and more.",
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontPoppins.className,
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
            <Analytics />
            <SpeedInsights />
          </SessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
