import { NavLink } from "react-router-dom";
import React from 'react';
const UserMenu = () => {
    return (
        <>
            <div className="navbar-nav justify-content-center">
                <div className="list-group dashboard-menu">
                    <h4>User Panel</h4>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
                        Profile
                    </NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
                        Orders
                    </NavLink>
                </div>
            </div>
        </>
    )
}
export default UserMenu;
