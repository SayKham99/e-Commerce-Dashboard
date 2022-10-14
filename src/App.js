import React from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Products from "./components/Products/Products";
import Users from "./components/Users/Users";
import Orders from "./components/Orders/Orders";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/dashboard'} element={<Sidebar/>}>
                    <Route index element={<Products/>}/>
                    <Route path={'products'} element={<Products/>}/>
                    <Route path={'users'} element={<Users/>}/>
                    <Route path={'orders'} element={<Orders/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;