import React from "react";
import {NavLink} from 'react-router-dom'

export const Navbar = () => {

    return (
        <nav>
            <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo center">Hero List</NavLink>
            </div>
        </nav>
    )
};