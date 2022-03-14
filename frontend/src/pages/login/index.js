import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import "./login.css";
import nocap from "../../images/nocap.jpg";

import storeContext from "../../components/context/"
import Spinner from "../../components/spinner";


function PagesLogin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { setToken } = useContext(storeContext);
  const history = useHistory();
  const [erroInput, setErroInput] = useState('');

  
  const onChanges = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  
  const [login, {loading, error}] = useMutation(LOGIN, {
    update(proxy, result){
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
    if(values.email === '' || values.password === ''){
      setErroInput('Preenhca os campos!');
      return
    }
    login();
  }
  
  if(loading){
    return Spinner();
  }
  
  return (
    <div className="container">
      
        <div id="card" className="card text-center">
          <div className="card-body">
            <div className="logo"> <img src={nocap} alt="" /> </div>
            <h2 className="text-center mt-4 name"> NoCap </h2>
            <form onSubmit={onSubmit} className="p-3 mt-3">
                <div className={error ? "alert alert-danger" : ''}>
                  {error ? error.message : ''}<br></br>
                </div>

                <div className={error || erroInput ? "alert alert-danger" : ''}>
                  {error ? error.message : ''}<br></br>
                  {erroInput ? erroInput : ''}<br></br>
                </div>
            
                <div className="input-group input-group-sm mb-3">
                  <input className="form-control" type="email" name="email" id="email" placeholder="E-mail" value={values.email}
                  onChange={onChanges}/>
                </div>

                <div class="input-group input-group-sm mb-3">
                <input className="form-control" type="password" name="password" id="pwd" placeholder="Password" value={values.password}
                onChange={onChanges}/>
                </div>

                <button type="submit" className="btn mt-3">Entrar</button>
            </form>
            <div className="text-center fs-6"><a href="/create-count">Cadastre-se</a></div>
        </div>
      </div>
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