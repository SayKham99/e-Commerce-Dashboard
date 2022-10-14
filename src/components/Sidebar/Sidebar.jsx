import React, {useEffect, useState} from 'react';
import './sidebar.scss'
import {NavLink, Outlet} from "react-router-dom";
import CreateModal from "../Modals/Create.modal/Create.modal";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

function Sidebar() {
    const [open, setOpen] = useState(false)
    /*const [categories, setCategories] = useState([])
    //read category
    useEffect(() => {
        let category = [];
        let data = [];
        const categ = ref(db, 'categories/');
        onValue(categ, (snapshot) => {
            data = [];
            snapshot.forEach(function (productSnapshot) {
                let userData = productSnapshot.val();
                category.push(userData)
                setCategories(category)
            })
        })
    }, [])*/

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
        <CreateModal open={open} setOpen={setOpen}/>
        <div className='outlet'>
            <div className='outlet__navbar'>
                <input type="search" className='outlet__navbar-search'/>
                <button onClick={() => setOpen(true)} className='outlet__navbar-btn'>Create <span>+</span></button>
            </div>
            <Outlet/>
        </div>
    </section>);
}

export default Sidebar;