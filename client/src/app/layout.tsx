import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import StoreProvider from "../store/StoreProvider";
import "./globals.css";

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Local Travel & Weather Dashboard",
  description: "Backend course group assignment: Enter your address to see public transport departures, local weather, and traffic incidents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={dmSans.className}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
};
