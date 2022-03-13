import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import storeContext from "../../context";

const RoutesPrivate = ({ component: Component, ...rest}) => {
    const { token } = useContext(storeContext);

    return(
      <Route 
        {...rest} 
        render={() => token
            ? <Component {...rest} />
            : <Redirect to="/login" />
        }
      />
    )
}

export default RoutesPrivate;