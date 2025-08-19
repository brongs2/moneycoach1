import { createContext, useState } from "react";

// Context will deliver { data, setData }
export const DataContext = createContext({ data: null, setData: () => {} });

const initialData = {
  personal: [
    {
      birth: "",
      gender: "",
      purpose: ""
    }
  ],
  saving: [
    {
      category: "",
      amount: 0,
      unit: ""
    }
  ],
  invest: [
    {
      category: "",
      amount: 0,
      unit: ""
    }
  ],
  asset: [
    {
      category: "",
      has_loan: true,
      interest_rate: 0,
      rate: 0,
      purchase_price: {
        amount: 0,
        unit: ""
      },
      current_price: {
        amount: 0,
        unit: ""
      },
      loan_price: {
        amount: 0,
        unit: ""
      },
      repayment: {
        amount: 0,
        unit: ""
      }
    }
  ],
  debt: [
    {
      category: "",
      interest_rate: 0,
      compound: true,
      loan_price: {
        amount: 0,
        unit: ""
      },
      repayment: {
        amount: 0,
        unit: ""
      }
    }
  ]
};

export function DataProvider({ children }) {
  const [data, setData] = useState(initialData);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}