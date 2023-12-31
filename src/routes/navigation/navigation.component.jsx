import React, { Fragment } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as Crown } from "../../assets/crown.svg";
import "./navigation.styles.scss";
const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to={"/"}>
                    <Crown />
                </Link>
                <div className="nav-links-container">
                <Link className="nav-link" to={"/sign-in"}>
                        SIGN IN
                    </Link>
                    <Link className="nav-link" to={"/shop"}>
                        SHOP
                    </Link>
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
}

export default Navigation;