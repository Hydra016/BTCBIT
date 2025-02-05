import "@/styles/globals.css";
import UserProvider from "@/contexts/UserContext";
import type { AppProps } from "next/app";
import CurrencyProvider from "@/contexts/CurrenciesContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </CurrencyProvider>
  );
}
