import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cookies } from "next/headers";
import QueryProvider from "@/providers/QueryProvider";
import ClientLayout from "./home/ClientLayout";
import { LanguageProvider } from "./providers/LanguageContext";
import { fetchBlogData, fetchLangs } from "./utils/homeApi";
import ScrollToTopButton from "./components/shared/ScrollToTopButton";
import { HomeBlogProvider } from "./providers/HomeBlogContext";
import { GoogleTagManager } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Album Travel",
  description: "Discover amazing travel blogs and adventures",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("album-token")?.value || null;
  const currentUser = cookieStore.get("currentUser")?.value || null;

  const langsData = await fetchLangs();
  const langs = Object.keys(langsData)
    .filter((key) => key !== "_id" && key !== "updated_at")
    .map((name) => ({ name, id: langsData[name] }));

  const initialLang = langs[0] || null; // Default to null if no languages
  const initialBlog = initialLang ? await fetchBlogData(initialLang.name) : {};

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5LN8P47B" />
      <head>
        <title>{</title>
        <meta name="description" content="Discover amazing travel blogs and adventures" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LN8P47B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* Add script to check localStorage for language */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedLang = localStorage.getItem('language');
                window.initialLang = storedLang ? JSON.parse(storedLang) : null;
              })();
            `
          }}
        />
        <QueryProvider>
          <LanguageProvider>
            <HomeBlogProvider
              initialLangs={langs}
              initialLang={initialLang}
              initialBlog={initialBlog}
            >
              <ClientLayout token={token} currentUser={currentUser}>
                {children}
              </ClientLayout>
            </HomeBlogProvider>
          </LanguageProvider>
        </QueryProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
