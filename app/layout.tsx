import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import localfont from "next/font/local"
import Provider from "./Provider";
import WithLoading from "./components/Loading";
import "./globals.css";
import path from "path";

export const metadata: Metadata = {
  title: "MAGAA",
  description: "Make America Great Again and Again",
};

const AmericanaXbdBt = localfont(
  {
    src: [
      {
        path: "../public/assets/fonts/americana_xbd_bt_extra_bold.ttf",
        weight: "500"
      }
    ],
    variable: "--font-american-x"
  }
)

const AmericanSimple = localfont(
  {
    src: [
      {
        path: "../public/assets/fonts/AmericanaStd.ttf",
        weight: "500"
      }
    ],
    variable: "--font-american-simple"
  }
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${AmericanaXbdBt?.variable} ${AmericanSimple?.variable}`}>
      <body className="bg-[#121526]">
        {/* <WithLoading />
        <Header />
        {children}
        <Footer /> */}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
