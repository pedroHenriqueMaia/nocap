import { createContext } from "react";

const storeContext = createContext({
    token: null,
    setToken: () => {},
});

export default storeContext;