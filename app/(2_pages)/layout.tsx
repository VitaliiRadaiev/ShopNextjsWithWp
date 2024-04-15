import type { Metadata } from "next";
import "@/app/1_app/globals.css";
import { Header } from "@/app/3_widgets/header";
import { ibm_plex_sans, roboto } from "@/app/1_app/fonts";
import { Footer } from "../3_widgets/footer";
import { ProgressBar } from "../6_shared/ui/ProgressBar";
import { BasketContextContainer } from "../5_entities/basket";


export const metadata: Metadata = {
  title: "Shop",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${ibm_plex_sans.variable} ${roboto.variable}`}>
        <BasketContextContainer>
          <Header />
          {children}
          <Footer />
          <ProgressBar />
        </BasketContextContainer>
      </body>
    </html>
  );
}
