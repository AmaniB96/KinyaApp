import { Geist, Geist_Mono, Poetsen_One } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poetsenOne = Poetsen_One({
  variable: "--font-poetsen-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "KinyaApp – Learn Kinyarwanda",
  description: "Learn Kinyarwanda with interactive lessons and quizzes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poetsenOne.variable}`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
