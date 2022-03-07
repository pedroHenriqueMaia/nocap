import { useState } from "react";
import "./login.css";
import nocap from "../../images/nocap.jpg";

// uncontrolled

export default function PagesLogin() {
  const [value, setValue] = useState(
    () => window.localStorage.getItem("github_username") || ""
  );

  function onSubmit(event) {
    event.preventDefault();

    window.localStorage.setItem("github_username", value);
    window.location.href = `http://localhost:4000/github-authentication?login=${value}`;
  }

  return (
    <div class="wrapper">
        <div class="logo"> <img src={nocap} alt="" /> </div>
        <div class="text-center mt-4 name"> NoCap </div>
        <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center"> <span class="far fa-user"></span> <input type="email" name="userName" id="userName" placeholder="E-mail" /> </div>
            <div class="form-field d-flex align-items-center"> <span class="fas fa-key"></span> <input type="password" name="password" id="pwd" placeholder="Password" /> </div> 
            <button class="btn mt-3">Entrar</button>
        </form>
        <div class="text-center fs-6"><a href="#">Cadastre-se</a></div>
    </div>
  );
}