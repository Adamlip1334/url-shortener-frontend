import Image from "next/image";
import { Inter } from "next/font/google";
import UrlShortener from "./components/url-shortener";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 dark:bg-dark-bg transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <UrlShortener />
    </main>
  )
}