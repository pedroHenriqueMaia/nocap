import { useContext } from "react";
import { useHistory } from "react-router-dom";
import storeContext from "../../components/context/"


function Logout() {
  const { token, setToken } = useContext(storeContext);
  const history = useHistory();

  if(token != null){
    setToken(null);
    return history.goBack();
  }
  
  return(
      <div className="teste">
          
      </div>
  );
}

export default Logout;