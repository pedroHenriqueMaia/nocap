import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';
import PagesHome from "./home";
import PagesLogin from './login';
import StoreProvider from "../components/context/provider";
import RoutesPrivate from '../components/routes/private/private';
import createCount from './createCount';

const PagesRoot = () => (
    <Router>
        <StoreProvider>
            <Switch>
                <Route path="/login" component={PagesLogin} />
                <Route path="/create-count" component={createCount} />
                <RoutesPrivate path="/" component={PagesHome} />
            </Switch>
        </StoreProvider>
    </Router>
)

export default PagesRoot;