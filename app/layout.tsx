"use client";
import "./globals.css";
import { Montserrat } from "@next/font/google";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Sidenav from "./components/Sidenav";
import TopNav from "./components/Topnav";
import { ThemeContextProvider } from "./context/theme";

const monstserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-monstserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css'
      ></link>
      <head />
      <body className={`${monstserrat.className} w-full overflow-x-hidden`}>
        <Provider store={store}>
          <ThemeContextProvider>
            <TopNav />
            <div className='grid'>
              <Sidenav />
              <div className='px-8 py-4 mt-[5em] ml-[15em]'>{children}</div>
            </div>
          </ThemeContextProvider>
        </Provider>
      </body>
    </html>
  );
}
