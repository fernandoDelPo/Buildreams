import React from 'react';

function UserList(props){
    return (
        <React.Fragment>
            <tr>
                <td>{props.id}</td>
                <td>{props.nombre}</td>
                <td>{props.nick}</td>
                <td>{props.email}</td>
                <td>{props.country}</td>
                <th><a target="_blank" rel="noreferrer" href={`${props.detail}`}>{props.detail}</a></th>
                <th><a className="linkTo" target="_blank" rel="noreferrer" href={`http://localhost:3030/users/profile`}><button className='linkTo'>Ver Perfil</button></a></th>
            </tr>
        </React.Fragment>
    )
}
export default UserList;