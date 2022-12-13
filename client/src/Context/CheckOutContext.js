import { createContext, useState } from "react";

export const CheckOutContext = createContext();

const CheckOutContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const value = { name, setName, email, setEmail, phone, setPhone, address, setAddress };

  return <CheckOutContext.Provider value={value}>{children}</CheckOutContext.Provider>;
};

export default CheckOutContextProvider;
