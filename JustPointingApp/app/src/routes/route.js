import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from '../components/home/home';
import SizeItems from '../components/size-items/size-items';

const JustRoute = props =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = { Home }/>
                <Route path = "/:id" component = { SizeItems }/>
            </Switch>
        </BrowserRouter>
    )
}

export default JustRoute;