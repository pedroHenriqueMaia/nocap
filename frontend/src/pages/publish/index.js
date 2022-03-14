import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../components/nav";
import Spinner from "../../components/spinner";
import "./style.css"

function PagesPublish(){
  const [values, setValues] = useState({
    title: '',
    message: '',
  });
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('token'));

  const [createPublication, {loading, error}] = useMutation(CREATE_PUBLICATION, {
    update(proxy, result){
      console.log(result)
      return history.push('/')
    },
    variables: {
      title: values.title,
      message: values.message,
      publication_date: dataAtual,
      user: user.user.email
    },
    context: {
      headers: {
          "Content-Type": "application/json",
          "Authorization": user.token ? `Bearer ${user.token}` : ''
      }
  }
  })

  console.log(user.user.email, values.message, values.title, dataAtual)
  const onChanges = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    createPublication()
  }

  if(loading){
    return Spinner();
  }

    return(
      <div>
          <Nav />
        <div className="container">
          <div className="card text-center">
            <div className="card-body">
              <h4 className="card-title">Olá {user.user.name}, compartilhe seus pensamentos!</h4><br></br>
              <h6 className="card-subtitle mb-2 text-muted">({user.user.email})</h6><br></br>
              <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" name="title" placeholder="Titulo" value={values.title} onChange={onChanges} />
                </div>

                <div className="input-group">
                  <textarea type="text" className="form-control" name="message" placeholder="Escreva..." value={values.message} onChange={onChanges}></textarea>
              </div><br></br>

              <button type="submit" className="btn mt-3">Publicar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}

const CREATE_PUBLICATION = gql`
mutation createPublication($title: String!, $message: String!, $publication_date: String!, $user: String!){
  createPublication(createPublicationInput: {
    title: $title
    message: $message
    publication_date: $publication_date
    user: $user
  }){
    id
    title
    like
  }
}
`;

let data = new Date();
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = data.getFullYear();
let dataAtual = dia + '/' + mes + '/' + ano;

export default PagesPublish;