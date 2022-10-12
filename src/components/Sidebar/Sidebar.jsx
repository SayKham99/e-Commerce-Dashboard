import React from 'react';
import './sidebar.scss'
import {NavLink, Outlet} from "react-router-dom";

function Sidebar() {
    return (<section className='container'>
        <div className='sidebar'>
            <div className='sidebar__top'>
                <div className='sidebar__top-logo'>
                    <h1 className='logo'>Vodiy Polimer</h1>
                </div>
                <div className='sidebar__top-menu'>
                    <ul className='sidebar__top-menu list'>
                        <li className='list__item'>
                            <NavLink to={'/dashboard'}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className='list__item'>
                            <NavLink to={'/dashboard/products'}>
                                Products
                            </NavLink>
                        </li>
                        <li className='list__item'>
                            <NavLink to={'/dashboard/users'}>
                                Users
                            </NavLink>
                        </li>
                        <li className='list__item'>
                            <NavLink to={'/dashboard/orders'}>
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='sidebar__bottom'>
                bottom
            </div>
        </div>
        <div className='outlet'>
            <div className='outlet__navbar'>
                <input type="search" className='outlet__navbar-search'/>
            </div>
            <Outlet/>
        </div>
    </section>);
}

export default Sidebar;