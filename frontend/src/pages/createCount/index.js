import { useState } from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import "./createCount.css";
import nocap from "../../images/nocap.jpg";
import Spinner from "../../components/spinner";


function CreateCount() {
  const [values, setValues] = useState({
    email: '',
    name: '',
    bio: '',
    password: '',
    password2: '',
  });
  const [erroPassword, setErroPassword] = useState('')
  const [erroInput, setErroInput] = useState('')
  const history = useHistory();

  
  const onChanges = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  
  const [createCount, {loading, error}] = useMutation(CREATE_COUNT, {
    update(proxy, result){
      console.log(result)
      if(result){
        return history.push('/login')
      }

      setValues({
        email: '',
        name: '',
        bio: '',
        password: '',
        password2: '',
      })
    },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    if(values.password !== values.password2){
      setErroPassword("Senhas diferentes");
      return
    }
    if(values.password == '' || values.email == '' || values.name == ''){
      setErroInput("Preencha todos os campos");
      return
    }
    
    setErroInput('');
    setErroPassword('');
    createCount();
  }
  
  if(loading){
    return Spinner();
  }
  
  return (
    <div className="wrapper">
        <div className="logo"> <img src={nocap} alt="" /> </div>
        <div className="text-center mt-4 name"> NoCap </div>
        <form onSubmit={onSubmit} className="p-3 mt-3">
            <div className={error || erroInput || erroPassword ? "alert alert-danger" : ''}>
              {error ? error.message : ''}
              <br></br>
              {erroPassword ? erroPassword : ''}
              <br></br>
              {erroInput ? erroInput : ''}
            </div>
            <div className="form-field d-flex align-items-center">
              <span className="far fa-user"></span>
              <input type="email" name="email" id="email" placeholder="E-mail" value={values.email}
              onChange={onChanges}/> 
            </div>

            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input type="text" name="name" id="name" placeholder="Name" value={values.name}
              onChange={onChanges}/>
            </div> 

            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input type="password" name="password" id="pwd" placeholder="Password" value={values.password}
              onChange={onChanges}/>
            </div>

            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input type="password" name="password2" id="pwd2" placeholder="Confirm Password" value={values.password2}
              onChange={onChanges}/>
            </div>

            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input type="text" name="bio" id="bio" placeholder="Biografia" value={values.bio}
              onChange={onChanges}/>
            </div> 

            <button type="submit" className="btn mt-3">Entrar</button>
        </form>
        <div className="text-center fs-6"><a href="/login">Voltar</a></div>
    </div>
  );
}

const CREATE_COUNT = gql`
mutation CreateCounts($name: String!, $email: String!, $password: String!, $bio: String!){
  createUser(createUserInput: {
  	name: $name
    email: $email
    password: $password
    bio: $bio
  }
  ){
    id
    name
    email
    bio
  }
}
`;

export default CreateCount;