import React, {useEffect} from "react";
import "./app-header.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as SessionActions from "../../store/session/session-actions";
import { useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";

const AppHeader = (props) => {
    const History = useHistory();
    var cookies = new Cookies();
    useEffect(()=>{
        if (cookies.get("userdetails")) {
            var userInfo = cookies.get("userdetails");
            props.login(userInfo);
        }
    },[])

    const openLoginPopup = () => {
        props.openLoginPopup(true);
    };
    const logout = () => {
        cookies.remove('userdetails');
        cookies.remove('token');
        props.logout();
        History.replace("/");
    };
    return (
        <div>
            <div className="app-tabs">
                <div className="app-header-tab">
                    <NavLink to="/" exact activeClassName="tab-is-active">
                        Home
                    </NavLink>
                    <NavLink to="/retro/" activeClassName="tab-is-active">
                        Retro
                    </NavLink>
                    <NavLink to="/about/" activeClassName="tab-is-active">
                        About
                    </NavLink>
                </div>
                <div className="app-header-tab login-tabs">
                    {!props.isUserLoggedIn && (
                        <NavLink
                            to="/register/"
                            activeClassName="tab-is-active">
                            Register
                        </NavLink>
                    )}
                    {!props.isUserLoggedIn ? (
                        <a className="app-login-btn" onClick={openLoginPopup}>
                            Login
                        </a>
                    ) : (
                        <a className="app-login-btn" onClick={logout}>
                            Logout
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isUserLoggedIn: state.SessionReducer.isUserLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openLoginPopup: (shouldOpenLogin) =>
            dispatch(SessionActions.open_login_popup(shouldOpenLogin)),
        logout: () => dispatch(SessionActions.logout_user()),
        login: (userDetails) => dispatch(SessionActions.login_user(userDetails)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
