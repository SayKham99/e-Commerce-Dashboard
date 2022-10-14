import React, {useEffect, useState} from 'react';
import './Users.scss'

import {ReactComponent as Edit} from "../../assets/edit.svg";
import {ReactComponent as View} from "../../assets/view.svg";
import {ReactComponent as Delete} from "../../assets/trash.svg";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

function Users() {
    const [users, setUsers] = useState([])

    //read users
    useEffect(() => {
        let data = [];
        const Test = ref(db, 'users/');
        onValue(Test, (snapshot) => {
            data = [];
            snapshot.forEach(function (productSnapshot) {
                let userData = productSnapshot.val();
                data.push(userData)
                setUsers(data)
            })
        })
    }, []);

    return (
        <section className='users'>
            <h1 className='users__title'>Active Users</h1>
            <table className='users__table'>
                <tr className='users__table-header'>
                    <th>Name</th>
                    <th>Second Name</th>
                    <th>Company Name</th>
                    <th>Phone Number</th>
                    <th>Device Type</th>
                    <th>Actions</th>
                </tr>
                {users.map(person => (
                    <tr className='users__table-info' key={person.id}>
                        <td>{person.user_first_name}</td>
                        <td>{person.user_last_name}</td>
                        <td>{person.user_company_name}</td>
                        <td>{person.user_phone_number}</td>
                        <td>{person.user_device_type}</td>
                        <td className='users__table-info--btns'>
                            <button className='button view'><View/></button>
                            <button className='button edit'><Edit/></button>
                            <button className='button delete'><Delete/></button>
                        </td>
                    </tr>
                ))}
            </table>
        </section>
    );
}

export default Users;