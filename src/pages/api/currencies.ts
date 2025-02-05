import type { NextApiRequest, NextApiResponse } from "next";
import currenciesData from "../../utils/currencies.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const typedCurrenciesData: { [key: string]: string } = currenciesData;

  try {
    const response = await fetch(
      "https://67862af6f80b78923aa5ace3.mockapi.io/api/v1/balance"
    );
    const data = await response.json();
    const mappedCurrencies = data.map(
      (item: { id: string; amount: number }) => ({
        id: item.id,
        amount: item.amount,
        name: typedCurrenciesData[item.id],
      })
    );

    res.status(200).json(mappedCurrencies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
