import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import "./login.css";
import nocap from "../../images/nocap.jpg";
import Spinner from "../../components/spinner";
import storeContext from "../../components/context/"


function PagesLogin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { setToken } = useContext(storeContext);
  const history = useHistory();

  
  const onChanges = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  
  const [login, {loading, error}] = useMutation(LOGIN, {
    update(proxy, result){

      console.log(result.data.login.token)
      if(result.data.login.token){
        setToken(result.data.login);
        return history.push('/')
      }

      setValues({
        email: '',
        password: '',
      })
    },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    login();

    console.log()
  }
  
  if(loading){
    return Spinner();
  }
  
  return (
    <div className="wrapper">
        <div className="logo"> <img src={nocap} alt="" /> </div>
        <div className="text-center mt-4 name"> NoCap </div>
        <form onSubmit={onSubmit} className="p-3 mt-3">
            <div className={error ? "alert alert-danger" : ''}>
              {error ? error.message : ''}
            </div>
            <div className="form-field d-flex align-items-center">
              <span className="far fa-user"></span>
              <input type="email" name="email" id="email" placeholder="E-mail" value={values.email}
              onChange={onChanges}/> 
            </div>

            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input type="password" name="password" id="pwd" placeholder="Password" value={values.password}
              onChange={onChanges}/>
            </div> 

            <button type="submit" className="btn mt-3">Entrar</button>
        </form>
        <div className="text-center fs-6"><a href="/create-count">Cadastre-se</a></div>
    </div>
  );
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!){
  login(data: {
    email: $email
    password: $password
  }){
    user{
      id
      name
      email
      bio
    }
    token
  }
}
`;

export default PagesLogin;