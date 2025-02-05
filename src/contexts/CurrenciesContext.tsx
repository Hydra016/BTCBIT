import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from "react";
import currenciesData from "../utils/currencies.json";

interface CurrenciesData {
  [key: string]: string;
}

const typedCurrenciesData: CurrenciesData = currenciesData;

export interface Currency {
  id: string;
  amount: number;
  name: string;
}

export interface CurrencyContextInterface {
  currencies: Currency[];
  setCurrencies: Dispatch<SetStateAction<Currency[]>>;
}

const defaultState = {
  currencies: [],
  setCurrencies: () => {},
} as CurrencyContextInterface;

export const CurrencyContext =
  createContext<CurrencyContextInterface>(defaultState);

type CurrencyProviderProps = {
  children: ReactNode;
};

export default function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/currencies");
        const data = await response.json();
        const mappedCurrencies = data;

        setCurrencies(mappedCurrencies);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currencies, setCurrencies }}>
      {children}
    </CurrencyContext.Provider>
  );
}
