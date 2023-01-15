import React from 'react';

function UserList(props){
    return (
        <React.Fragment>
            <tr>
                <td>{props.id}</td>
                <td>{props.nombre}</td>
                <td>{props.nick}</td>
                <td>{props.email}</td>
                <td>{props.image}</td>
            </tr>
        </React.Fragment>
    )
}
export default UserList;