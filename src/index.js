import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Main/Main';
 
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Main} />
        </Switch>
    </ BrowserRouter>,
    document.getElementById('root')
);

