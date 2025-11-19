/*This is layout.tsx

It contains code for the title and navbar option. */ 

import type { Metadata } from "next";
import { Alegreya_SC, Honk } from "next/font/google";
import "./globals.css";
import Link from "next/link"


// The fonts which are used

const alegreyaSc = Alegreya_SC({
  subsets: ["latin"],
  weight: "400",
})

const honk = Honk({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Soccer Standings Live",
  description: "The table standings of the top-5 soccer leagues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        // Setting up the title and navbar
        className={alegreyaSc.className}>
        <main>
        
        <header className="w-full h-30 flex justify-center items-center bg-gray-950">
            
            
            <h1 className={`${honk.className} animate-bounce text-5xl text-black-500`}>
              Soccer Standings Live
            </h1>
        </header>



        <nav className="grid grid-cols-5 gap-4 p-6 bg-gray-400">
          <Link href="/">
            <div className="bg-black px-4 py-3 rounded-lg shadow-md text-center hover:bg-blue-900 transition">
              <span className="text-blue-200 text-xl font-bold">Premier League</span>
            </div>
          </Link>

          <Link href="/laLiga">
            <div className="bg-black px-4 py-3 rounded-lg shadow-md text-center hover:bg-blue-900 transition">
              <span className="text-blue-200 text-xl font-bold">LaLiga</span>
            </div>
          </Link>

          <Link href="/serieA">
            <div className="bg-black px-4 py-3 rounded-lg shadow-md text-center hover:bg-blue-900 transition">
              <span className="text-blue-200 text-xl font-bold">Serie A</span>
            </div>
          </Link>

          <Link href="/bundesliga">
            <div className="bg-black px-4 py-3 rounded-lg shadow-md text-center hover:bg-blue-900 transition">
              <span className="text-blue-200 text-xl font-bold">Bundesliga</span>
            </div>
          </Link>

          <Link href="/ligue1">
            <div className="bg-black px-4 py-3 rounded-lg shadow-md text-center hover:bg-blue-900 transition">
              <span className="text-blue-200 text-xl font-bold">Ligue 1</span>
            </div>
          </Link>
        </nav>






    </main>

        {children}
        
      </body>
    </html>
  );
}
