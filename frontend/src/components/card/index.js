import { mdiHeart } from '@mdi/js';
import Icon from '@mdi/react'
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "./css/style.css";


const Card = ({id, title, message, date, user, like}) => {
  const [liked, setliked] = useState(0);
  const [likes, setLikes] = useState(like);

  const token = JSON.parse(localStorage.getItem('token'));
  const [likedMutation, {error1}] = useMutation(LIKED, {
    variables: {
      id:id
    },
    context: {
      headers: {
          "Content-Type": "application/json",
          "Authorization": token.token ? `Bearer ${token.token}` : ''
      }
  }})

  const [unlikedMutation, {error2}] = useMutation(UNLIKED, {
    variables: {
      id:id
    },
    context: {
      headers: {
          "Content-Type": "application/json",
          "Authorization": token.token ? `Bearer ${token.token}` : ''
      }
  }})

  if(error1 || error2){
    alert(error1 + error2)
  }

  function clickToliked() {
    if(liked == 0){
      setliked(1);
      setLikes(likes + 1);
      likedMutation();
    }else{
      setliked(0);
      like = like -1;
      setLikes(likes - 1);
      unlikedMutation();
    }
  }

  return (
    <div className="warpper">
      <div className="card text-center" key={id}>
        <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
        <div className="like" onClick={clickToliked}>
          <span>{likes}</span>
        <Icon path={mdiHeart} size={1} color={liked == 1 ? "red" : "black"}/>
        </div>
        <p className="card-text">{message}</p>
        {/* <a href="#" className="card-link">Card link</a>
        <a href="#" className="card-link">Another link</a> */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{user}</li>
        </ul>
        </div>
      </div>
  </div>
  );
}

const LIKED = gql`
mutation liked($id: String!){
  liked(id: $id)
}
`;
const UNLIKED = gql`
mutation unliked($id: String!){
  unliked(id: $id)
}
`;

export default Card;