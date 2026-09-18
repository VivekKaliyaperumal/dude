import type { Metadata, Viewport } from "next";
import { Archivo, Cinzel, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { jsonLdString, localBusinessJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { StickyBar } from "@/components/chrome/StickyBar";
import { WhatsAppFab } from "@/components/chrome/WhatsAppFab";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { SkipLink } from "@/components/ui/SkipLink";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
  preload: false,
});
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.titleDefault, template: `%s | ${site.brand.copy}` },
  description: site.description,
  applicationName: site.brand.copy,
};

export const viewport: Viewport = {
  themeColor: "#1B1C1A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={cn(archivo.variable, plexMono.variable, plexSans.variable, cinzel.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* Photos outside the hero are still Unsplash stock until own site photography exists. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Marks JS as available before first paint so scroll-reveal can start hidden; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">
        <SkipLink />
        <RevealObserver />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Spacer so the mobile sticky bar never covers footer links. */}
        <div aria-hidden className="h-[57px] nav:hidden" />
        <aside aria-label="Quick contact">
          <WhatsAppFab />
          <StickyBar />
        </aside>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd()) }} />
      </body>
    </html>
  );
}
