import { createContext, useContext, useState } from "react";

const Store = createContext();

const StoreProvider = ({children}) => {
    const [cartItems,setCartItems] = useState([]);
    return (
        <Store.Provider value={[cartItems,setCartItems]}>
            {children}
        </Store.Provider>
    );
}

const useStore = ()=> useContext(Store);

export { StoreProvider, useStore };

