
import nocap from "../../images/nocap.jpg";
import "./style.css";
const Nav = (props) => {
  return (

<nav className="navbar navbar-light bg-light">
  <a className="navbar-brand" href="/">
    <img src={nocap} width="50" margin-right="30" height="50" className="d-inline-block align-top" alt="" />
    <h5>NoCap</h5>
  </a>
  <a id="publish" className="nav-link disabled" href="/publish"><span>+</span></a>
  <a className="nav-link disabled" href="/logout">Sair</a>
</nav>
  );
}
export default Nav;