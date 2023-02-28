import "./globals.css";
import { Montserrat } from "@next/font/google";
import Sidenav from "./components/Sidenav";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

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
      <head />
      <body className={`${monstserrat.className} w-full flex`}>
        <Sidenav />
        {/* {children} */}
      </body>
    </html>
  );
}
