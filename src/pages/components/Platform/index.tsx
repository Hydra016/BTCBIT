import React, { useState, useContext, useEffect, useMemo } from "react";
import { CurrencyContext } from "@/contexts/CurrenciesContext";
import { FiTable } from "react-icons/fi";
import Table1 from "./Table1";
import NotFound from "../Shared/NotFound";

const Platform = () => {
  const { currencies } = useContext(CurrencyContext);
  const [currencyData, setCurrencyData] = useState(currencies || []);
  const [columns, setColumns] = useState(2);
  const [selectedTable, setSelectedTable] = useState("option1");

  const memoizedCurrencyData = useMemo(() => {
    return currencies || [];
  }, [currencies]);

  useEffect(() => {
    setCurrencyData(memoizedCurrencyData);
  }, [memoizedCurrencyData]);

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value);
  };

  return (
    <div className="py-4 px-3">
      <div className="py-4 rounded-lg bg-[#fff] px-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl mb-4">Balances</h2>
          <div className="flex items-center gap-2 bg-gray-900 px-4 rounded">
            <FiTable color="#fff" size={20} className="text-gray-900" />
            <select
              className="text-white px-4 py-2 bg-gray-900 outline-none"
              value={selectedTable}
              onChange={handleTableChange}
            >
              <option className="w-full" value="option1">
                Table 1
              </option>
              <option className="w-full" value="option2">
                Table 2
              </option>
            </select>
          </div>
        </div>
        {selectedTable === "option1" ? (
          <Table1
            currencyData={currencyData}
            setCurrencyData={setCurrencyData}
            columns={columns}
            setColumns={setColumns}
          />
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default Platform;
