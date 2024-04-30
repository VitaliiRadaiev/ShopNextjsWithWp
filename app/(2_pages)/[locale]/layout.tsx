import type { Metadata } from "next";
import "@/app/1_app/globals.css";
import { Header } from "@/app/3_widgets/header";
import { ibm_plex_sans, roboto } from "@/app/1_app/fonts";
import { Footer } from "@/app//3_widgets/footer";
import { ProgressBar } from "@/app//6_shared/ui/ProgressBar";
import { BasketContextContainer } from "@/app//5_entities/basket";
import i18nConfig, { type Locale } from '@/public/i18nConfig';
import { CustomerContextContainer } from "@/app/5_entities/users";

export async function generateStaticParams() {
  return i18nConfig.locales.map(local => ({ locale: local }))
}

export const metadata: Metadata = {
  title: "Shop",
  description: "",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  return (
    <html lang={params.locale} >
      <body className={`${ibm_plex_sans.variable} ${roboto.variable}`}>
        <CustomerContextContainer>
          <BasketContextContainer>
            <Header locale={params.locale} />
            {children}
            <Footer />
            <ProgressBar />
          </BasketContextContainer>
        </CustomerContextContainer>
      </body>
    </html>
  );
}
