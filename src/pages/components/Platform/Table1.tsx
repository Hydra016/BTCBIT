import { Currency } from "@/contexts/CurrenciesContext";
import React from "react";
import {
  FiPlusCircle,
  FiMinusCircle,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

interface Props {
  currencyData: Currency[];
  setCurrencyData: React.Dispatch<React.SetStateAction<Currency[]>>;
  columns: number;
  setColumns: React.Dispatch<React.SetStateAction<number>>;
}

const Table1 = ({
  currencyData,
  setCurrencyData,
  columns,
  setColumns,
}: Props) => {
  const sortByIncreasingPrice = () => {
    const sortedData = [...currencyData].sort((a, b) => a.amount - b.amount);
    setCurrencyData(sortedData);
  };

  const sortByDecreasingPrice = () => {
    const sortedData = [...currencyData].sort((a, b) => b.amount - a.amount);
    setCurrencyData(sortedData);
  };

  const increaseColumns = () => {
    setColumns((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const decreaseColumns = () => {
    setColumns((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="table-1-container">
      <div className="flex justify-between items-center mb-4">
        <div className="flex md:flex-row flex-col gap-2">
          <div className="mb-4 flex gap-2">
            <button
              onClick={sortByIncreasingPrice}
              className="bg-gray-900 text-white px-4 py-2 rounded flex gap-2 items-center"
            >
              <FiTrendingUp size={20} />
              Sort by Increasing Price
            </button>
            <button
              onClick={sortByDecreasingPrice}
              className="bg-gray-900 text-white px-4 py-2 rounded flex gap-2 items-center"
            >
              <FiTrendingDown size={20} />
              Sort by Decreasing Price
            </button>
          </div>

          <div className="mb-4 flex gap-2">
            <button
              onClick={decreaseColumns}
              className="bg-gray-900 text-white px-4 py-2 rounded flex gap-2 items-center"
            >
              <FiMinusCircle size={20} />
              Decrease Columns
            </button>
            <button
              onClick={increaseColumns}
              className="bg-gray-900 text-white px-4 py-2 rounded flex gap-2 items-center"
            >
              <FiPlusCircle size={20} />
              Increase Columns
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              {[...Array(columns)].map((_, index) => (
                <React.Fragment key={index}>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Balance</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencyData && currencyData.length > 0 &&
              [...Array(Math.ceil(currencyData.length / columns))].map(
                (_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    {[...Array(columns)].map((_, colIndex) => {
                      const currency =
                        currencyData[rowIndex * columns + colIndex];
                      return currency ? (
                        <React.Fragment key={colIndex}>
                          <td className="border border-gray-300 p-2 font-bold text-center">
                            {currency.name}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {currency.amount}
                          </td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={colIndex}>
                          <td className="border border-gray-300 p-2"></td>
                          <td className="border border-gray-300 p-2"></td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table1;
