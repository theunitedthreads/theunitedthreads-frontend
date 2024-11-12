import Navbar from "@/components/shared/Navbar/Navbar";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/shared/Footer/Footer";
import TopLoader from "@/components/TopLoader/TopLoader";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import "react-pagination-bar/dist/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import Providers from "@/utils/Providers";
import { Toaster } from "sonner";
import "react-pagination-bar/dist/index.css";
import TopNotificationMarquee from "@/components/TopNotificationMarquee/TopNotificationMarquee";

// Custom font
const uncutSans = localFont({
  src: "../../public/fonts/UncutSans-Variable.woff2",

  display: "block",
  variable: "--font-uncut-sans",
  weight: "200 800",
});
``;

export const metadata = {
  title: {
    template: "%s | United Threads",
    default: "United Threads — Wear The Change",
  },
  description:
    "Design Your Own Apparel, Unleash Your Creativity. We pride ourselves in providing a curated collection of custom apparel designed to inspire and empower.",
};

export default function RootLayout({ children }) {
  // Under maintenance message toggler state
  // Only change when the site is under maintenance/update
  const isUnderMaintenance = true;

  return (
    <html lang="en" className={`${uncutSans.variable}`}>
      <head>
        <link
          rel="shortcut icon"
          href="/favicon-black.svg"
          type="image/x-icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="shortcut icon"
          href="/favicon-white.svg"
          type="image/x-icon"
          media="(prefers-color-scheme: dark)"
        />
      </head>

      <body className="font-uncut-sans antialiased">
        <Providers>
          {isUnderMaintenance && <TopNotificationMarquee />}
          <TopLoader />
          <ScrollToTop />

          <Navbar />

          <main className="min-h-screen">{children}</main>

          <Footer />

          <Toaster
            position="bottom-center"
            richColors
            duration={1800}
            closeButton
          />
        </Providers>
      </body>
    </html>
  );
}
