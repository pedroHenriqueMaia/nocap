import { mdiHeart } from '@mdi/js';
import Icon from '@mdi/react'
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "./css/style.css";


const CardErro = () => {

  return (
    <div className="warpper">
      <div className="card text-center">
        <div className="card-body">
        <h4 className="card-title">Nenhuma publicação!</h4>
        <h6 className="card-subtitle mb-2 text-muted">Faça uma publicação agora!</h6><br></br>
        <a href="/publish" className="btn">Publique</a>
        </div>
      </div>
  </div>
  );
}

export default CardErro;