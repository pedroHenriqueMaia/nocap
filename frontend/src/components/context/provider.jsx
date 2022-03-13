import useStorage from "../../utils/useStorage.js";
import Context from "./index.js"

const StoreProvider = ({children}) => {
    const [token, setToken] = useStorage('token')

    return(
        <Context.Provider
        value={{
            token,
            setToken
        }}
        >
            {children}
        </Context.Provider>
    )
}

export default StoreProvider;