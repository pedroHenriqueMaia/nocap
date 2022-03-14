import { gql, useQuery } from "@apollo/client";
import Card from "../../components/card";
import CardErro from "../../components/cardErro";
import Nav from "../../components/nav";

function PagesHome() {

  const user = JSON.parse(localStorage.getItem('token'));
  const {data, loading, error} = useQuery(PUBLICATIONS, {
    context: {
      headers: {
          "Content-Type": "application/json",
          "Authorization": user.token ? `Bearer ${user.token}` : ''
      }
  }
  })
  return (
    <div>
      <Nav />
      <div className="container">
        {data != null && data.Publications.length != 0 
        ? data.Publications.map((i) => (
            <Card key={i.id} id= {i.id} title={i.title} user={i.user} message={i.message} date={i.publication_date} like={i.like} />
        )) 
        : ( 
          <CardErro />
         )}
      </div>
    </div>
  );
}
const PUBLICATIONS = gql`
query{
  Publications{
    id
    title
    like
    user
    message
    publication_date
  }
}
`;

export default PagesHome;