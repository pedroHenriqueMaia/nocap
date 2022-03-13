import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import PagesRoot from './pages/root';


const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
  });
  
ReactDOM.render(
    <ApolloProvider client={client}>
        <PagesRoot />
    </ApolloProvider>,
    
    
    document.getElementById('root')
);