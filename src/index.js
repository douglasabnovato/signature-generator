import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Main/Main';
import TutGmail from './Tutorials/TutGmail';
import TutOutlook from './Tutorials/TutOutlook';
 
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Main} />
            <Route path="/tutorialgmail" component={TutGmail} />
            <Route path="/tutorialoutlook" component={TutOutlook} />
        </Switch>
    </ BrowserRouter>,
    document.getElementById('root')
);

