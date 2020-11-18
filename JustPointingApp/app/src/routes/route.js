import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/home/home';
import SizeItems from '../components/size-items/size-items';
import AppHeader from  '../components/app-header/app-header';
import Login from '../components/app-login/app-login';
import About from '../components/app-about/app-about';
import Retro from '../components/retro/retro';
import Registration from '../components/registration/registration';
import {connect} from 'react-redux';

const JustRoute = props =>{
    return (
        <>
            <Login openLoginPopup={props.openLoginPopup} showCancelButton={true}></Login>
            <AppHeader/>
            <Switch>
                <Route exact path = "/" component = { Home }/>
                <Route path = "/about" component = { About }/>
                <Route path = "/retro" component = { Retro }/>
                {/* <Route path = "/login" component = { Login }/> */}
                <Route path = "/register" component = { Registration }/>
                <Route path = "/:id" component = { SizeItems }/>
            </Switch>
        </>
    )
}

function mapStateToProps(state){
    return {
        openLoginPopup: state.SessionReducer.openLoginPopup
    }
}

export default connect(mapStateToProps,null)(JustRoute);